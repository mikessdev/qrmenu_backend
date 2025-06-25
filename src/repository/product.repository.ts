import { InjectModel } from '@nestjs/sequelize';
import { Product } from '@database/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@dtos/create/create-product.dto';
import { UpdateProductDto } from '@dtos/update/update-product.dto';
import { Status } from '@utils/enum/status.enum';
import { Exception } from '@utils/classes/exception';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product)
    private product: typeof Product,
  ) {}

  async findAll(categoryId: number) {
    try {
      const products = await this.product.findAll({
        where: { categoryId: categoryId },
        order: [['createdAt', 'ASC']],
      });
      return {
        status: Status.SUCCESS,
        message: products,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.product.create(createProductDto);
    } catch (error) {
      Exception.handler(error);
    }
  }

  async createAll(products: CreateProductDto[]) {
    try {
      return await this.product.bulkCreate(products);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.product.update(updateProductDto, {
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

  async remove(id: number) {
    try {
      const result = await this.product.destroy({
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
