import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { join } from 'path';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  host: join(__dirname, 'database.sqlite'),
  autoLoadModels: true,
  synchronize: false,
};
