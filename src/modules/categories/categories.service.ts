import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { ConflictMessage, SuccessMessage } from 'src/common/enums/message.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
    private s3Service: S3Service,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    const { name, slug } = createCategoryDto;

    await this.ensureSlugIsUnique(slug);
    const result = await this.s3Service.uploadFile(image, 'categories');
    const category = await this.categoryRepository.save({
      name,
      slug,
      image: result.Location,
    });

    return {
      status: 201,
      message: SuccessMessage.CreateCategory,
      data: category,
    };
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  async ensureSlugIsUnique(slug: string) {
    const existing = await this.categoryRepository.findOneBy({ slug });
    if (existing) throw new ConflictException(ConflictMessage.ExistCategorySlug);
  }
}
