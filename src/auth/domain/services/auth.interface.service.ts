import { UserType } from '../types/user.type';

export interface IAuthService {
  login(email: string, password: string): Promise<any>;
  register(user: Partial<UserType>, uuidRole: string): Promise<any>;
  generateRecoveryPassword(email: string): Promise<any>;
  changePassword(userId: number, password: string): Promise<any>;
  changePasswordByToken(token: string, password: string): Promise<any>;
  validateToken(token: string): Promise<any>;
}
