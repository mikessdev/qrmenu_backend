import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthMiddleware } from './auth/auth.middleware';
import { dataBaseConfig } from './database/database.providers';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    UsersModule,
    MenusModule,
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
