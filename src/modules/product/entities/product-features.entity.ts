import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(EntityName.ProductFeature)
export class ProductFeatureEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: number;

  @Column()
  key: string;

  @Column({ default: 0 })
  value: number;
}
