import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/nest/controllers/auth.controller';
import {
  authService,
  recoveryPasswordRepository,
  roleRepository,
  userRepository,
} from './infrastructure/constants/custom-providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './infrastructure/typeorm/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import config from '@/config';
import { HttpModule } from '@nestjs/axios';
import { RecoveryPasswordEntity } from './infrastructure/typeorm/entities/recovery-password.entity';
import { RolesEntity } from '@/database/entities/roles.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      UsersEntity,
      RecoveryPasswordEntity,
      RolesEntity,
    ]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: config().jwt.expiresIn },
      secretOrPrivateKey: config().jwt.secret,
    }),
  ],
  providers: [
    authService,
    userRepository,
    recoveryPasswordRepository,
    roleRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
