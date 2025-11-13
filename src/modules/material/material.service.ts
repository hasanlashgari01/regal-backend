import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialEntity } from './entities/material.entity';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material.dto';
import { ConflictMessage, SuccessMessage } from 'src/common/enums/message.enum';

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

  async ensureSlugIsUnique(slug: string) {
    const existing = await this.materialRepository.findOneBy({ slug });
    if (existing) throw new ConflictException(ConflictMessage.ExistMaterialSlug);
  }
}
