import { Module } from '@nestjs/common';
import { ProductsService } from '@services/products.service';
import { ProductsController } from '@controllers/products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@database/entities/product.entity';
import { ProductsRepository } from '@repository/product.repository';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
