import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRecoveryPasswordRepository } from '@/auth/domain/repositories/recovery-password.interface.repository';
import { RecoveryPasswordEntity } from '../entities/recovery-password.entity';
import { RecoveryPasswordModel } from '@/auth/domain/models/recovery-password.model';

@Injectable()
export class RecoveryPasswordRepository implements IRecoveryPasswordRepository {
  constructor(
    @InjectRepository(RecoveryPasswordEntity)
    private readonly recoveryPasswordRepository: Repository<RecoveryPasswordEntity>,
  ) {}

  async create(data: RecoveryPasswordModel): Promise<RecoveryPasswordModel> {
    const entity = new RecoveryPasswordEntity(data);

    const recoveryPassword = await this.recoveryPasswordRepository.save(entity);

    return recoveryPassword
      ? RecoveryPasswordModel.hydrate(recoveryPassword)
      : null;
  }

  async findOneByToken(token: string): Promise<RecoveryPasswordModel> {
    const recoveryPassword = await this.recoveryPasswordRepository.findOne({
      where: { token, status: false },
      relations: {
        user: true,
      },
    });

    return recoveryPassword
      ? RecoveryPasswordModel.hydrate(recoveryPassword)
      : null;
  }

  async desactivateTokensByUserId(
    userId: number,
  ): Promise<RecoveryPasswordModel> {
    const recoveryPassword = await this.recoveryPasswordRepository.findOne({
      where: { userId, status: false },
    });

    if (recoveryPassword) {
      recoveryPassword.status = true;
      await this.recoveryPasswordRepository.save(recoveryPassword);
    }

    return recoveryPassword
      ? RecoveryPasswordModel.hydrate(recoveryPassword)
      : null;
  }

  async update(data: RecoveryPasswordModel): Promise<RecoveryPasswordModel> {
    const entity = new RecoveryPasswordEntity(data);

    const recoveryPassword = await this.recoveryPasswordRepository.save(entity);

    return recoveryPassword
      ? RecoveryPasswordModel.hydrate(recoveryPassword)
      : null;
  }
}
