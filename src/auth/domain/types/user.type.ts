import { RoleType } from './role.type';

export type UserType = {
  userId: number;
  uuid: string;
  firstname: string;
  secondname: string;
  lastname: string;
  secondlastname: string;
  company?: string;
  phone?: string;
  email: string;
  password: string;
  roleId: number;
  role: RoleType;
};
