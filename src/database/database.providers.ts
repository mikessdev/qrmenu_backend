import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Dialect } from 'sequelize';

dotenv.config();

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: process.env.DATABASE_DIALECT as Dialect,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  autoLoadModels: false,
  synchronize: false,
};

const sequelize: Sequelize = new Sequelize(dataBaseConfig);
sequelize.addModels([Category, Product]);
