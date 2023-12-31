import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Category } from '@database/entities/category.entity';
import { Product } from '@database/entities/product.entity';
import { Menu } from '@database/entities/menu.entity';
import { User } from '@database/entities/user.entity';
import * as pg from 'pg';

dotenv.config();

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  dialectModule: pg,
  dialectOptions: { ssl: Boolean(process.env.DATABASE_ENABLE_SSL) },
};

const sequelize: Sequelize = new Sequelize(dataBaseConfig);
sequelize.addModels([Category, Product, Menu, User]);
