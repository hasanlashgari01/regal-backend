import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDesignDto } from './dto/create-design.dto';
import { UpdateDesignDto } from './dto/update-design.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DesignEntity } from './entities/design.entity';
import { Repository } from 'typeorm';
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

  update(id: number, updateDesignDto: UpdateDesignDto) {
    return `This action updates a #${id} design`;
  }

  remove(id: number) {
    return `This action removes a #${id} design`;
  }

  async ensureSlugIsUnique(enName: string) {
    const existing = await this.designRepository.findOneBy({ enName });
    if (existing) throw new ConflictException(ConflictMessage.ExistMaterialSlug);
  }
}
