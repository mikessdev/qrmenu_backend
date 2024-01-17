import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from '@services/app.service';
import { AppController } from '@controllers/app.controller';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { dataBaseConfig } from '@database/database.providers';
import { CategoriesModule } from '@modules/categories.module';
import { ProductsModule } from '@modules/products.module';
import { UsersModule } from '@modules/users.module';
import { MenusModule } from '@modules/menus.module';

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
          path: 'products/(.*)',
          method: RequestMethod.GET,
        },
        {
          path: 'products(.*)',
          method: RequestMethod.GET,
        },
        {
          path: 'categories/(.*)',
          method: RequestMethod.GET,
        },
        {
          path: 'categories(.*)',
          method: RequestMethod.GET,
        },
        {
          path: 'users/(.*)',
          method: RequestMethod.GET,
        },
        {
          path: 'menus/url/(.*)',
          method: RequestMethod.GET,
        },
        {
          path: 'menus(.*)',
          method: RequestMethod.GET,
        },
        {
          path: '/',
          method: RequestMethod.GET,
        },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
