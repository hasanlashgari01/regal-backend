import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictMessage, NotFoundMessage, SuccessMessage } from 'src/common/enums/message.enum';
import { DeepPartial, Repository } from 'typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SizeEntity } from './entities/size.entity';

@Injectable()
export class SizeService {
  constructor(@InjectRepository(SizeEntity) private sizeRepository: Repository<SizeEntity>) {}

  async create(createSizeDto: CreateSizeDto) {
    const { name, enName, sort } = createSizeDto;

    await this.ensureIsUnique(enName);
    const size = await this.sizeRepository.save({
      name,
      enName,
      sort,
    });
    return {
      status: 201,
      message: SuccessMessage.CreateSize,
      data: size,
    };
  }

  findAll() {
    return this.sizeRepository.find();
  }

  async findOne(id: number) {
    const size = await this.sizeRepository.findOneBy({ id });
    if (!size) throw new NotFoundException(NotFoundMessage.Size);

    return size;
  }

  async update(id: number, updateSizeDto: UpdateSizeDto) {
    await this.findOne(id);
    const { name, enName, sort } = updateSizeDto;
    const updateObject: DeepPartial<SizeEntity> = {};

    if (name) updateObject['name'] = name;
    if (enName) {
      await this.ensureIsUnique(enName);
      updateObject['enName'] = enName;
    }
    if (sort) updateObject['sort'] = sort;

    await this.sizeRepository.update({ id }, updateObject);

    return {
      message: SuccessMessage.UpdateSize,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.sizeRepository.delete({ id });

    return {
      message: SuccessMessage.DeleteSize,
    };
  }

  async ensureIsUnique(enName: string) {
    const existing = await this.sizeRepository.findOneBy({ enName });
    if (existing) throw new ConflictException(ConflictMessage.ExistSize);
  }
}
