import { IUserRepository } from '@/auth/domain/repositories/user.interface.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { UserModel } from '@/auth/domain/models/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async create(data: UserModel): Promise<UserModel> {
    const entity = new UsersEntity(data);

    const user = await this.userRepository.save(entity);

    return user ? UserModel.hydrate(user) : null;
  }

  async findOneById(userId: number): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: { userId },
      relations: {
        role: true,
      },
    });

    return user ? UserModel.hydrate(user) : null;
  }

  async findOneByEmail(email: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        role: true,
      },
    });
    return user ? UserModel.hydrate(user) : null;
  }

  async update(data: UserModel): Promise<UserModel> {
    const entity = new UsersEntity(data);

    const user = await this.userRepository.save(entity);

    return user ? UserModel.hydrate(user) : null;
  }
}
