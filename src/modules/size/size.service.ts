import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SizeEntity } from './entities/size.entity';
import { Repository } from 'typeorm';
import { ConflictMessage, NotFoundMessage, SuccessMessage } from 'src/common/enums/message.enum';

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

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return `This action updates a #${id} size`;
  }

  remove(id: number) {
    return `This action removes a #${id} size`;
  }

  async ensureIsUnique(enName: string) {
    const existing = await this.sizeRepository.findOneBy({ enName });
    if (existing) throw new ConflictException(ConflictMessage.ExistSize);
  }
}
