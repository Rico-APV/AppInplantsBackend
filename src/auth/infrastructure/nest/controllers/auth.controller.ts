import { IAuthService } from '@/auth/domain/services/auth.interface.service';
import SymbolsAuth from '@/auth/symbols-auth';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ChangePasswordByTokenDto,
  ChangePasswordDto,
  LoginDto,
  RecoveryPasswordDto,
  SignUpDto,
} from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SymbolsAuth.IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.register(body, body.roleUUID);
  }

  @Post('recovery-password')
  async recoveryPassword(@Body() body: RecoveryPasswordDto) {
    return this.authService.generateRecoveryPassword(body.email);
  }

  @Post('validate-recovery-token')
  async validateRecoveryPassword(@Body() token: string) {
    return this.authService.validateToken(token);
  }

  @Post('change-password')
  async changePassword(@Body() body: ChangePasswordDto) {
    return this.authService.changePassword(body.userId, body.password);
  }

  @Post('change-password-by-token')
  async changePasswordByToken(@Body() body: ChangePasswordByTokenDto) {
    return this.authService.changePasswordByToken(body.token, body.password);
  }
}
