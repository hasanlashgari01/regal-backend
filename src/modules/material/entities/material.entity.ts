import { EntityName } from 'src/common/enums/entity.enum';
import { ProductMaterialEntity } from 'src/modules/product/entities/product-material.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(EntityName.Material)
export class MaterialEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  slug: string;

  @OneToMany(() => ProductMaterialEntity, (pm) => pm.material)
  productMaterials: ProductMaterialEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
