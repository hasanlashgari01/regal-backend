import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { S3Service } from '../s3/s3.service';
import { ProductController } from './controllers/product.controller';
import { ProductCategoryEntity } from './entities/product-category.entity';
import { ProductColorEntity } from './entities/product-color.entity';
import { ProductFeatureEntity } from './entities/product-features.entity';
import { ProductImageEntity } from './entities/product-image.entity';
import { ProductMaterialEntity } from './entities/product-material.entity';
import { ProductSizeEntity } from './entities/product-size.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductImageService } from './services/product-image.service';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductSizeEntity,
      ProductColorEntity,
      ProductFeatureEntity,
      ProductImageEntity,
      ProductMaterialEntity,
      ProductCategoryEntity,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, S3Service, ProductImageService],
})
export class ProductModule {}
