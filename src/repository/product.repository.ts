import { InjectModel } from '@nestjs/sequelize';
import { Product } from '@database/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@dtos/create/create-product.dto';
import { UpdateProductDto } from '@dtos/update/update-product.dto';
import { Status } from '@utils/enum/status.enum';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async findAll(categoryId: string) {
    try {
      const products = await this.productRepository.findAll({
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
      const product = await this.productRepository.create(createProductDto);
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

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.productRepository.update(updateProductDto, {
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

  remove(id: string) {
    return this.productRepository.destroy({ where: { id: id } });
  }
}
