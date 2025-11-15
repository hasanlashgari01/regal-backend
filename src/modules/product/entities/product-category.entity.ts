import { EntityName } from 'src/common/enums/entity.enum';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';

@Entity(EntityName.ProductCategory)
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.categories, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products, { onDelete: 'CASCADE' })
  category: CategoryEntity;
}
