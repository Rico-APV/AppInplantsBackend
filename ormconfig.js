"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ormconfig = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/src/database/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: true,
    synchronize: false,
    logging: false,
    autoLoadEntities: true,
    keepConnectionAlive: true,
};
exports.default = ormconfig;
//# sourceMappingURL=ormconfig.js.map