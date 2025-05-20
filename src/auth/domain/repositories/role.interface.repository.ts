import { RoleModel } from '../models/role.model';

export interface IRoleRepository {
  findOneById(roleId: number): Promise<RoleModel>;
  findOneByUUID(roleUUID: string): Promise<RoleModel>;
}
