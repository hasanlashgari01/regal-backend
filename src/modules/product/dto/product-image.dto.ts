import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty({ format: 'binary' })
  image: Express.Multer.File;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}
