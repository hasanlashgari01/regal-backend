import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from './entities/color.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ConflictMessage, NotFoundMessage, SuccessMessage } from 'src/common/enums/message.enum';

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

  find() {
    return this.colorRepository.find();
  }

  async findOne(id: number) {
    const color = await this.colorRepository.findOneBy({ id });
    if (!color) throw new NotFoundException(NotFoundMessage.Color);

    return color;
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    await this.findOne(id);
    const { name, code } = updateColorDto;
    const updateObject: DeepPartial<ColorEntity> = {};
    if (name) updateObject['name'] = name;
    if (code) {
      await this.ensureCodeIsUnique(code);
      updateObject['code'] = code;
    }

    await this.colorRepository.update({ id }, updateObject);

    return {
      message: SuccessMessage.UpdateColor,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.colorRepository.delete({ id });

    return {
      message: SuccessMessage.DeleteColor,
    };
  }

  async ensureCodeIsUnique(code: string) {
    const existing = await this.colorRepository.findOneBy({ code });
    if (existing) throw new ConflictException(ConflictMessage.ExistMaterialSlug);
  }
}
