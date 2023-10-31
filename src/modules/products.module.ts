import { Module } from '@nestjs/common';
import { ProductsService } from '@services/products.service';
import { ProductsController } from '@controllers/products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@database/entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
