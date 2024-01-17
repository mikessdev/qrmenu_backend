import { InjectModel } from '@nestjs/sequelize';
import { Product } from '@database/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@dtos/create/create-product.dto';
import { UpdateProductDto } from '@dtos/update/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async findAll(categoryId: string) {
    try {
      return await this.productRepository.findAll({
        where: { categoryId: categoryId },
        order: [['createdAt', 'ASC']],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.create(createProductDto);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(updateProductDto, {
      where: { id: id },
    });
  }

  remove(id: string) {
    return this.productRepository.destroy({ where: { id: id } });
  }
}
