import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(EntityName.Size)
export class SizeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  enName: string;

  @Column()
  sort: number;
}
