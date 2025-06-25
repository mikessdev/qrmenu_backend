import { CreateProductDto } from '@dtos/create/create-product.dto';
import { UpdateProductDto } from '@dtos/update/update-product.dto';
import { ProductsRepository } from '@repository/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(categoryId: number) {
    return await this.productsRepository.findAll(categoryId);
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productsRepository.create(createProductDto);
  }

  async createAll(categoryId: number) {
    const commonProductData = {
      categoryId,
      image:
        'https://firebasestorage.googleapis.com/v0/b/qrmenu-f0493.appspot.com/o/exemplos%2Fproduct.png?alt=media&token=ff809a3d-2532-4182-80dd-ded61c536d59',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id blandit erat. Mauris nisi velit, eleifend et tristique sit amet.',
      price: 'R$ 15,00',
      unit: '500g',
      likes: 0,
    };

    const products = Array.from({ length: 3 }, (_, i) => ({
      ...commonProductData,
      title: `Product 0${i + 1}`,
    }));

    try {
      return await this.productsRepository.createAll(products);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.productsRepository.remove(id);
  }
}
