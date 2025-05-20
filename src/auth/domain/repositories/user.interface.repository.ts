import { UserModel } from '../models/user.model';

export interface IUserRepository {
  create(data: UserModel): Promise<UserModel>;
  findOneById(userId: number): Promise<UserModel>;
  findOneByEmail(email: string): Promise<UserModel>;
  update(data: UserModel): Promise<UserModel>;
}
