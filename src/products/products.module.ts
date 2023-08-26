import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'products',
        method: RequestMethod.DELETE,
      },
      {
        path: 'products',
        method: RequestMethod.PATCH,
      },
      {
        path: 'products',
        method: RequestMethod.POST,
      },
      {
        path: 'products',
        method: RequestMethod.PUT,
      },
    );
  }
}
