import { UserType } from './user.type';

export type RecoveryPasswordType = {
  recoveryPasswordId: number;
  uuid: string;
  userId: number;
  user: UserType;
  token: string;
  status: boolean;
};
