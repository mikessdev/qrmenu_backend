import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@dtos/create/create-product.dto';
import { UpdateProductDto } from '@dtos/update/update-product.dto';
import { Product } from '@database/entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto);
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
