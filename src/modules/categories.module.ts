import { Module } from '@nestjs/common';
import { CategoriesService } from '@services/categories.service';
import { CategoriesController } from '@controllers/categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from '@database/entities/category.entity';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
