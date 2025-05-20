import { BaseModel } from '@/core/domain/models/base.model';
import { UserModel } from './user.model';
import { RecoveryPasswordType } from '../types/recovery-password.type';

export class RecoveryPasswordModel extends BaseModel {
  private _recoveryPasswordId: number;
  private _userId: number;
  private _user: UserModel;
  private _token: string;
  private _status: boolean;

  public toJSON() {
    const aggregate = super.toJSON();

    return {
      uuid: this._uuid,
      recoveryPasswordId: this._recoveryPasswordId,
      userId: this._userId,
      user: this._user ? this._user.toJSON() : null,
      token: this._token,
      status: this._status,
      ...aggregate,
    };
  }

  get status() {
    return this._status;
  }

  static create(data: Partial<RecoveryPasswordType>) {
    const newRecoveryPassword = new RecoveryPasswordModel();

    newRecoveryPassword._userId = data.userId;
    newRecoveryPassword._token = data.token;
    newRecoveryPassword._status = data.status;

    return newRecoveryPassword;
  }

  static hydrate(data: Partial<RecoveryPasswordType>) {
    const newRecoveryPassword = new RecoveryPasswordModel();

    newRecoveryPassword._recoveryPasswordId = data.recoveryPasswordId;
    newRecoveryPassword._uuid = data.uuid;
    newRecoveryPassword._userId = data.userId;
    newRecoveryPassword._token = data.token;
    newRecoveryPassword._status = data.status;
    newRecoveryPassword._user = data.user ? UserModel.hydrate(data.user) : null;

    return newRecoveryPassword;
  }
}
