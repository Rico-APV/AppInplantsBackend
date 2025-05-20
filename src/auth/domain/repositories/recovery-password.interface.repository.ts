import { RecoveryPasswordModel } from '../models/recovery-password.model';

export interface IRecoveryPasswordRepository {
  create(data: RecoveryPasswordModel): Promise<RecoveryPasswordModel>;
  findOneByToken(token: string): Promise<RecoveryPasswordModel>;
  desactivateTokensByUserId(userId: number): Promise<RecoveryPasswordModel>;
  update(data: RecoveryPasswordModel): Promise<RecoveryPasswordModel>;
}
