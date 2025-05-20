import { BaseModel } from '@/core/domain/models/base.model';
import { RoleType } from '../types/role.type';

export class RoleModel extends BaseModel {
  private _roleId: number;
  private _nameRole: string;
  private _description: string;

  public toJSON() {
    const aggregate = super.toJSON();

    return {
      roleId: this._roleId,
      uuid: this._uuid,
      name: this._nameRole,
      description: this._description,
      ...aggregate,
    };
  }

  static create(data: Partial<RoleType>) {
    const newRole = new RoleModel();

    newRole._nameRole = data.nameRole;
    newRole._description = data.description;

    return newRole;
  }

  static hydrate(data: Partial<RoleType>) {
    const newRole = new RoleModel();

    newRole._roleId = data.roleId;
    newRole._uuid = data.uuid;
    newRole._nameRole = data.nameRole;
    newRole._description = data.description;

    return newRole;
  }
}
