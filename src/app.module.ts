import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthMiddleware } from './auth/auth.middleware';
import { ProductsModule } from './products/products.module';
import { dataBaseConfig } from './database/database.providers';
import { CategoriesModule } from './categories/categories.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(dataBaseConfig),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: 'auth',
          method: RequestMethod.GET,
        },
        {
          path: 'products/(.*)',
          method: RequestMethod.GET,
        },
        {
          path: 'categories/(.*)',
          method: RequestMethod.GET,
        },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
