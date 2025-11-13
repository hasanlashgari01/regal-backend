import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(EntityName.Design)
export class DesignEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  enName: string;
}
