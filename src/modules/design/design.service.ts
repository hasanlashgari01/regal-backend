import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DesignEntity } from './entities/design.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ConflictMessage, NotFoundMessage, SuccessMessage } from 'src/common/enums/message.enum';

@Injectable()
export class DesignService {
  constructor(@InjectRepository(DesignEntity) private designRepository: Repository<DesignEntity>) {}

  async create(createDesignDto: CreateDesignDto) {
    const { name, enName } = createDesignDto;

    await this.ensureSlugIsUnique(enName);
    const design = await this.designRepository.save({
      name,
      enName,
    });

    return {
      status: 201,
      message: SuccessMessage.CreateDesign,
      data: design,
    };
  }

  findAll() {
    return this.designRepository.find();
  }

  async findOne(id: number) {
    const design = await this.designRepository.findOneBy({ id });
    if (!design) throw new NotFoundException(NotFoundMessage.Design);

    return design;
  }

  async update(id: number, updateDesignDto: UpdateDesignDto) {
    await this.findOne(id);
    const { name, enName } = updateDesignDto;
    const updateObject: DeepPartial<DesignEntity> = {};
    if (name) updateObject['name'] = name;
    if (enName) {
      await this.ensureSlugIsUnique(enName);
      updateObject['enName'] = enName;
    }

    await this.designRepository.update({ id }, updateObject);

    return {
      message: SuccessMessage.UpdateDesign,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.designRepository.delete({ id });

    return {
      message: SuccessMessage.DeleteDesign,
    };
  }

  async ensureSlugIsUnique(enName: string) {
    const existing = await this.designRepository.findOneBy({ enName });
    if (existing) throw new ConflictException(ConflictMessage.ExistMaterialSlug);
  }
}
