import { EntityName } from 'src/common/enums/entity.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity(EntityName.ProductImage)
export class ProductImageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;

  @Column()
  productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.images, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
