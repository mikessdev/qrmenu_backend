import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { join } from 'path';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: join('.db', 'data.sqlite3'),
  autoLoadModels: true,
  synchronize: false,
};
