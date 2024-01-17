import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { UpdateCategoryDto } from '@dtos/update/update-category.dto';
import { Category } from '@database/entities/category.entity';
import { Product } from '@database/entities/product.entity';
import { Status } from '@utils/enum/status.enum';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category)
    private category: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const product = await this.category.create(createCategoryDto);
      return {
        status: Status.SUCCESS,
        message: product,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }

  async findAllWithProducts(menuId: string) {
    try {
      const categories = await this.category.findAll({
        where: { menuId: menuId },
        order: [['createdAt', 'ASC']],
        include: { model: Product },
      });
      return {
        status: Status.SUCCESS,
        message: categories,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const result = await this.category.update(updateCategoryDto, {
        where: { id: id },
      });
      return {
        status: Status.SUCCESS,
        message: result,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }

  async remove(id: string) {
    try {
      const result = await this.category.destroy({
        where: { id: id },
      });
      return {
        status: Status.SUCCESS,
        message: result,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }
}
