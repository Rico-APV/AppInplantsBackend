import { Entity } from 'typeorm';
import { UsersEntity as CoreUsersEntity } from '@/database/entities/users.entity';

@Entity('users')
export class UsersEntity extends CoreUsersEntity {}
