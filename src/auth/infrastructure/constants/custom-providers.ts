import { AuthService } from '@/auth/application/services/auth.service';
import { Provider } from '@nestjs/common';
import { UserRepository } from '../typeorm/repositories/user.repository';
import { RecoveryPasswordRepository } from '../typeorm/repositories/recovery-password.repository';
import { RoleRepository } from '../typeorm/repositories/role.repository';

export const authService: Provider = {
  provide: Symbol.for('IAuthService'),
  useClass: AuthService,
};

export const userRepository: Provider = {
  provide: Symbol.for('IUserRepository'),
  useClass: UserRepository,
};

export const recoveryPasswordRepository: Provider = {
  provide: Symbol.for('IRecoveryPasswordRepository'),
  useClass: RecoveryPasswordRepository,
};

export const roleRepository: Provider = {
  provide: Symbol.for('IRoleRepository'),
  useClass: RoleRepository,
};
