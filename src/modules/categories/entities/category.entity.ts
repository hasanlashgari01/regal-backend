import { EntityName } from 'src/common/enums/entity.enum';
import { ProductCategoryEntity } from 'src/modules/product/entities/product-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(EntityName.Categories)
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  slug: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  imageKey: string;

  @OneToMany(() => ProductCategoryEntity, (pc) => pc.category)
  products: ProductCategoryEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
