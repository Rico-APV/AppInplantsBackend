import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { RolesEntity } from './roles.entity';

@Entity({
  name: 'inplants_app_users',
})
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: 'User ID',
  })
  userId: number;

  @Column({
    name: 'first_name',
    comment: 'First Name',
  })
  firstname: string;

  @Column({
    name: 'second_name',
    comment: 'Second Name',
  })
  secondname: string;

  @Column({
    name: 'last_name',
    comment: 'Last Name',
  })
  lastname: string;

  @Column({
    name: 'second_last_name',
    comment: 'Second Last Name',
  })
  secondlastname: string;

  @Column({
    name: 'company',
    comment: 'Company',
  })
  company?: string;

  @Column({
    name: 'phone',
    comment: 'Phone',
  })
  phone?: string;

  @Column({
    name: 'email',
    comment: 'Email',
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    comment: 'Password',
  })
  password: string;

  @ManyToOne(() => RolesEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'role_id',
  })
  role: RolesEntity;
  @Column({
    name: 'role_id',
    comment: 'Role ID',
  })
  roleId: number;

  constructor(user: any) {
    super();
    if (user) {
      const entity = JSON.parse(JSON.stringify(user));
      Object.assign(this, entity);
      if (entity.role) {
        this.role = new RolesEntity(entity.role);
      }
    }
  }
}
