import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@/config';
import ormconfig from '../../ormconfig';
import { ConfigType } from '@nestjs/config';

@Global()
@Module({
  exports: [TypeOrmModule],
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { type, host, port, username, password, database, synchronize } =
          configService.database.typeormConfig;
        return {
          ...ormconfig,
          type: type as any,
          host,
          port,
          username,
          password,
          database,
          synchronize,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
