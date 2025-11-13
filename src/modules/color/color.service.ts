import { ConflictException, Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from './entities/color.entity';
import { Repository } from 'typeorm';
import { ConflictMessage, SuccessMessage } from 'src/common/enums/message.enum';

@Injectable()
export class ColorService {
  constructor(@InjectRepository(ColorEntity) private colorRepository: Repository<ColorEntity>) {}

  async create(createColorDto: CreateColorDto) {
    const { name, code } = createColorDto;
    await this.ensureCodeIsUnique(code);

    const color = await this.colorRepository.save({
      name,
      code,
    });

    return {
      status: 201,
      message: SuccessMessage.CreateColor,
      data: color,
    };
  }

  findAll() {
    return `This action returns all color`;
  }

  findOne(id: number) {
    return `This action returns a #${id} color`;
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return `This action updates a #${id} color`;
  }

  remove(id: number) {
    return `This action removes a #${id} color`;
  }

  async ensureCodeIsUnique(code: string) {
    const existing = await this.colorRepository.findOneBy({ code });
    if (existing) throw new ConflictException(ConflictMessage.ExistMaterialSlug);
  }
}
