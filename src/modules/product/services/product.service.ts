import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { ConflictMessage, NotFoundMessage, SuccessMessage } from 'src/common/enums/message.enum';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductImageService } from './product-image.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    private productImageService: ProductImageService,
  ) {}

  async create(createProductDto: CreateProductDto, images: Express.Multer.File[]) {
    const { name, code, count, description, price, discount, activeDiscount } = createProductDto;
    const slug = await this.generateNewSlug();

    const newProduct = await this.productRepository.save({
      name,
      slug,
      code,
      count,
      description,
      price,
      discount,
      activeDiscount,
    });
    for (const image of images) {
      await this.productImageService.create({ image, productId: newProduct.id });
    }

    return {
      status: 201,
      message: SuccessMessage.CreateProduct,
      data: newProduct,
    };
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOneById(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException(NotFoundMessage.Product);

    return product;
  }

  async findOneBySlug(slug: string) {
    const product = await this.productRepository.findOneBy({ slug });
    if (!product) throw new NotFoundException(NotFoundMessage.Product);

    return product;
  }

  private async generateNewSlug() {
    const slug = randomInt(100000, 999999).toString();
    await this.ensureSlugIsUnique(slug);

    return slug;
  }

  private async ensureSlugIsUnique(slug: string) {
    const existing = await this.productRepository.findOneBy({ slug });
    if (existing) throw new ConflictException(ConflictMessage.ExistMaterialSlug);
  }
}
