import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity(EntityName.ProductFeature)
export class ProductFeatureEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.features, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @Column()
  key: string;

  @Column({ default: 0 })
  value: number;
}
