import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { dataBaseConfig } from './database/database.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategorysModule } from './categorys/categorys.module';

@Module({
  imports: [ProductsModule, SequelizeModule.forRoot(dataBaseConfig), CategorysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
