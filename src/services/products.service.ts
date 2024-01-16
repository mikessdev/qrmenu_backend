import { CreateProductDto } from '@dtos/create/create-product.dto';
import { UpdateProductDto } from '@dtos/update/update-product.dto';
import { ProductsRepository } from '@repository/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(categoryId: string) {
    return await this.productsRepository.findAll(categoryId);
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productsRepository.create(createProductDto);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productsRepository.remove(id);
  }
}
