import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { DeepPartial, Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { ConflictMessage, NotFoundMessage, SuccessMessage } from 'src/common/enums/message.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private s3Service: S3Service,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    const { name, slug } = createCategoryDto;

    await this.ensureSlugIsUnique(slug);
    const { Location, Key } = await this.s3Service.uploadFile(image, 'categories');
    const category = await this.categoryRepository.save({
      name,
      slug,
      image: Location,
      imageKey: Key,
    });

    return {
      status: 201,
      message: SuccessMessage.CreateCategory,
      data: category,
    };
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOneById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException(NotFoundMessage.Category);

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, image: Express.Multer.File) {
    const category = await this.findOneById(id);
    const { name, slug } = updateCategoryDto;

    const updateObject: DeepPartial<CategoryEntity> = {};
    if (name) updateObject['name'] = name;
    if (slug) {
      await this.ensureSlugIsUnique(slug);
      updateObject['slug'] = slug;
    }
    if (image) {
      const { Location, Key } = await this.s3Service.uploadFile(image, 'categories');
      if (Location) {
        updateObject['image'] = Location;
        updateObject['imageKey'] = Key;
        await this.s3Service.deleteFile(category.imageKey);
      }
    }

    await this.categoryRepository.update({ id }, updateObject);

    return {
      message: SuccessMessage.UpdateCategory,
    };
  }

  async remove(id: number) {
    const category = await this.findOneById(id);
    const result = await this.categoryRepository.delete({ id });
    if (result.affected === 0) throw new NotFoundException(NotFoundMessage.Category);
    await this.s3Service.deleteFile(category.imageKey);

    return {
      message: SuccessMessage.DeleteCategory,
    };
  }

  async ensureSlugIsUnique(slug: string) {
    const existing = await this.categoryRepository.findOneBy({ slug });
    if (existing) throw new ConflictException(ConflictMessage.ExistCategorySlug);
  }
}
