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
import { ProductFeatureEntity } from './product-features.entity';
import { ProductSizeEntity } from './product-size.entity';
import { ProductColorEntity } from './product-color.entity';

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

  @Column({ nullable: true })
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

  @OneToMany(() => ProductColorEntity, (color) => color.product)
  colors: ProductColorEntity;

  @OneToMany(() => ProductSizeEntity, (size) => size.product)
  sizes: ProductSizeEntity;

  @OneToMany(() => ProductFeatureEntity, (feature) => feature.product)
  features: ProductFeatureEntity;

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;
}
