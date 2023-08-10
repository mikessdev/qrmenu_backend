import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { dataBaseConfig } from './database/database.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    SequelizeModule.forRoot(dataBaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
