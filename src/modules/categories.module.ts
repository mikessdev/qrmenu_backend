import { Module } from '@nestjs/common';
import { CategoriesService } from '@services/categories.service';
import { CategoriesController } from '@controllers/categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from '@database/entities/category.entity';
import { CategoriesRepository } from '@repository/categories.repository';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
