import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialEntity } from './entities/material.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { ConflictMessage, NotFoundMessage, SuccessMessage } from 'src/common/enums/message.enum';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(MaterialEntity) private materialRepository: Repository<MaterialEntity>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto) {
    const { name, slug } = createMaterialDto;

    await this.ensureSlugIsUnique(slug);
    const material = await this.materialRepository.save({
      name,
      slug,
    });

    return {
      status: 201,
      message: SuccessMessage.CreateMaterial,
      data: material,
    };
  }

  findAll() {
    return this.materialRepository.find();
  }

  async findOneById(id: number) {
    const material = await this.materialRepository.findOneBy({ id });
    if (!material) throw new NotFoundException(NotFoundMessage.Material);

    return material;
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    await this.findOneById(id);
    const { name, slug } = updateMaterialDto;

    const updateObject: DeepPartial<MaterialEntity> = {};
    if (name) updateObject['name'] = name;
    if (slug) {
      await this.ensureSlugIsUnique(slug);
      updateObject['slug'] = slug;
    }

    await this.materialRepository.update({ id }, updateObject);

    return {
      message: SuccessMessage.UpdateMaterial,
    };
  }

  async remove(id: number) {
    await this.findOneById(id);
    await this.materialRepository.delete({ id });

    return {
      message: SuccessMessage.DeleteCategory,
    };
  }

  async ensureSlugIsUnique(slug: string) {
    const existing = await this.materialRepository.findOneBy({ slug });
    if (existing) throw new ConflictException(ConflictMessage.ExistMaterialSlug);
  }
}
