import { Entity } from 'typeorm';
import { RecoveryPasswordEntity as RecoveryPasswordEntityCore } from '@/database/entities/recovery-password.entity';

@Entity('recovery_password')
export class RecoveryPasswordEntity extends RecoveryPasswordEntityCore {}
