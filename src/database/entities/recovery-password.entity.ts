import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'inplants_app_recovery_password',
})
export class RecoveryPasswordEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'recovery_password_id',
    comment: 'Recovery Password ID',
  })
  recoveryPasswordId: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UsersEntity;
  @Column({
    name: 'user_id',
    comment: 'User ID',
  })
  userId: number;

  @Column({
    name: 'token',
    comment: 'Token',
  })
  token: string;

  @Column({
    name: 'status',
    comment: 'Status if the token is used or valid',
    default: false,
  })
  status: boolean;

  constructor(recoveryPassword: any) {
    super();
    if (recoveryPassword) {
      const entity = JSON.parse(JSON.stringify(recoveryPassword));
      Object.assign(this, entity);
      if (entity.user) {
        this.user = new UsersEntity(entity.user);
      }
    }
  }
}
