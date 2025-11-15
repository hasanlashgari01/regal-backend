import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ProductStatus } from '../enum/product-status.enum';

export class CreateProductDto {
  @ApiProperty({ default: '' })
  name: string;

  @ApiPropertyOptional({ default: '' })
  code?: string;

  @ApiPropertyOptional({ default: '' })
  description?: string;

  @ApiPropertyOptional({ default: 0 })
  count?: number;

  @ApiPropertyOptional({ default: 100000 })
  price?: number;

  @ApiPropertyOptional({ default: 0 })
  discount?: number;

  @ApiPropertyOptional({ default: false })
  activeDiscount?: boolean;

  @ApiPropertyOptional({ enum: ProductStatus, default: ProductStatus.DRAFT })
  status: ProductStatus;

  @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: string[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
