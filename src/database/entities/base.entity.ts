import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

export abstract class BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'uuid',
    type: 'uuid',
    unique: true,
  })
  uuid: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @BeforeInsert()
  generateUUID() {
    this.uuid = this.uuid || uuidV4();
  }
}
