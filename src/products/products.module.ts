import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BullModule } from '@nestjs/bull';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    BullModule.registerQueue({ name: 'emails' }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
