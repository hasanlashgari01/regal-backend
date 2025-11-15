import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { Admin } from 'src/common/decorators/auth.decorator';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { ImageValidation } from 'src/common/pipes/image-validation.pipe';
import { CreateProductDto } from '../dto/product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Admin()
  @UseInterceptors(FilesInterceptor('images', 10))
  @ApiConsumes(SwaggerConsumes.MultipartData)
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles(ImageValidation) images: Express.Multer.File[],
  ) {
    return this.productService.create(createProductDto, images);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }
}
