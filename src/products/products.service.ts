import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto as any);
  }

  findAllByCategoryId(id: string) {
    return this.productRepository.findAll({
      where: { categoryId: id },
    });
  }

  findOne(id: string) {
    return this.productRepository.findByPk(id);
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
