import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Repository } from 'typeorm';
import { config } from 'src/Database/database.providers';

@Module({
  imports: [config],
  controllers: [ProductsController],
  providers: [Repository, ProductsService],
})
export class ProductsModule {}
