import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(EntityName.Color)
export class ColorEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;
}
