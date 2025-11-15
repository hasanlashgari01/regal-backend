import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImageEntity } from '../entities/product-image.entity';
import { CreateProductImageDto } from '../dto/product-image.dto';
import { S3Service } from 'src/modules/s3/s3.service';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private productImageRepository: Repository<ProductImageEntity>,
    private s3Service: S3Service,
  ) {}

  async create(createProductImageDto: CreateProductImageDto) {
    const { image, productId } = createProductImageDto;

    const result = await this.s3Service.uploadFile(image, 'products');
    const newImage = await this.productImageRepository.save({
      url: result.Location,
      key: result.Key,
      productId,
    });

    return newImage;
  }
}
