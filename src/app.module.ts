import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
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
    AuthModule,
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
          path: 'categories',
          method: RequestMethod.GET,
        },
        {
          path: 'products',
          method: RequestMethod.GET,
        },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
