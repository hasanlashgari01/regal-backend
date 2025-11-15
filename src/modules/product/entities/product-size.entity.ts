import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity(EntityName.ProductSize)
export class ProductSizeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  productId: number;
  @ManyToOne(() => ProductEntity, (product) => product.features, { onDelete: 'CASCADE' })
  product: ProductEntity;

  @Column()
  size: string;

  @Column({ default: 0 })
  count: number;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column({ type: 'decimal', nullable: true, default: 0 })
  discount: number;

  @Column({ nullable: true, default: false })
  activeDiscount: boolean;
}
