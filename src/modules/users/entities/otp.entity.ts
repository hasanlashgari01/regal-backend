import { EntityName } from 'src/common/enums/entity.enum';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity(EntityName.Otp)
export class OtpEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  code: string;

  @Column()
  expiresIn: Date;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ nullable: true })
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: 'CASCADE' })
  user: UserEntity;
}
