import { EntityName } from 'src/common/enums/entity.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductColorEntity } from './product-color.entity';
import { ProductFeatureEntity } from './product-features.entity';
import { ProductImageEntity } from './product-image.entity';
import { ProductSizeEntity } from './product-size.entity';
import { ProductMaterialEntity } from './product-material.entity';
import { ProductCategoryEntity } from './product-category.entity';
import { ProductStatus } from '../enum/product-status.enum';

@Entity(EntityName.Product)
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Index()
  name: string;

  @Column({ unique: true })
  @Index()
  slug: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  count: number;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column({ type: 'decimal', nullable: true, default: 0 })
  discount: number;

  @Column({ nullable: true, default: false })
  activeDiscount: boolean;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.DRAFT })
  status: ProductStatus;

  @OneToMany(() => ProductImageEntity, (image) => image.product, { cascade: true })
  images: ProductImageEntity[];

  @OneToMany(() => ProductColorEntity, (color) => color.product)
  colors: ProductColorEntity;

  @OneToMany(() => ProductSizeEntity, (size) => size.product)
  sizes: ProductSizeEntity;

  @OneToMany(() => ProductFeatureEntity, (feature) => feature.product)
  features: ProductFeatureEntity;

  @OneToMany(() => ProductMaterialEntity, (pm) => pm.product)
  materials: ProductMaterialEntity[];

  @OneToMany(() => ProductCategoryEntity, (pc) => pc.product)
  categories: ProductCategoryEntity[];

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;
}
