import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import inplantsApps from '@/database/entities/inplants-apps';

const ormconfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/src/database/entities/*.entity{.ts,.js}'],
  migrations: inplantsApps,
  migrationsTableName: 'migrations',
  migrationsRun: true,
  synchronize: false,
  logging: false,
  autoLoadEntities: true,
  keepConnectionAlive: true,
};

export default ormconfig;
