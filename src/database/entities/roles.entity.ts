import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'inplants_app_roles',
})
export class RolesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'role_id',
    comment: 'Role ID',
  })
  roleId: number;

  @Column({
    name: 'name_role',
    comment: 'Name Role',
    unique: true,
  })
  nameRole: string;

  @Column({
    name: 'description',
    comment: 'Description',
  })
  description: string;

  constructor(role: any) {
    super();
    if (role) {
      const entity = JSON.parse(JSON.stringify(role));
      Object.assign(this, entity);
    }
  }
}
