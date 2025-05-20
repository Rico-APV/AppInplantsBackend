import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoleRepository } from '@/auth/domain/repositories/role.interface.repository';
import { RoleModel } from '@/auth/domain/models/role.model';
import { RolesEntity } from '../entities/role.entity';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
  ) {}

  async findOneById(roleId: number): Promise<RoleModel> {
    const role = await this.roleRepository.findOne({
      where: { roleId },
    });

    return role ? RoleModel.hydrate(role) : null;
  }

  async findOneByUUID(roleUUID: string): Promise<RoleModel> {
    const role = await this.roleRepository.findOne({
      where: { uuid: roleUUID },
    });

    return role ? RoleModel.hydrate(role) : null;
  }
}
