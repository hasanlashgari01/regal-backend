import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { MaterialEntity } from 'src/modules/material/entities/material.entity';

@Entity(EntityName.ProductMaterial)
export class ProductMaterialEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.materials, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @Column()
  materialId: number;

  @ManyToOne(() => MaterialEntity, (material) => material.productMaterials, { onDelete: 'CASCADE' })
  material: MaterialEntity;
}
