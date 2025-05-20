import { Entity } from 'typeorm';
import { RolesEntity as RolesEntityCore } from '@/database/entities/roles.entity';

@Entity('roles')
export class RolesEntity extends RolesEntityCore {}
