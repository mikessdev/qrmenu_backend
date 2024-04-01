import { CreateProductDto } from '@dtos/create/create-product.dto';
import { UpdateProductDto } from '@dtos/update/update-product.dto';
import { ProductsRepository } from '@repository/product.repository';
import { Injectable } from '@nestjs/common';
import { randomUUID as uuid } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(categoryId: string) {
    return await this.productsRepository.findAll(categoryId);
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productsRepository.create(createProductDto);
  }
  async createAll(categoryId: string) {
    const products = [
      {
        id: uuid(),
        categoryId,
        title: 'Product 01',
        image:
          'https://firebasestorage.googleapis.com/v0/b/qrmenu-f0493.appspot.com/o/exemplos%2Fproduct.png?alt=media&token=ff809a3d-2532-4182-80dd-ded61c536d59',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id blandit erat. Mauris nisi velit, eleifend et tristique sit amet.',
        price: 'R$ 15,00',
        unit: '500g',
        likes: 0,
      },
      {
        id: uuid(),
        categoryId,
        title: 'Product 02',
        image:
          'https://firebasestorage.googleapis.com/v0/b/qrmenu-f0493.appspot.com/o/exemplos%2Fproduct.png?alt=media&token=ff809a3d-2532-4182-80dd-ded61c536d59',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id blandit erat. Mauris nisi velit, eleifend et tristique sit amet.',
        price: 'R$ 15,00',
        unit: '500g',
        likes: 0,
      },
      {
        id: uuid(),
        categoryId,
        title: 'Product 03',
        image:
          'https://firebasestorage.googleapis.com/v0/b/qrmenu-f0493.appspot.com/o/exemplos%2Fproduct.png?alt=media&token=ff809a3d-2532-4182-80dd-ded61c536d59',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id blandit erat. Mauris nisi velit, eleifend et tristique sit amet.',
        price: 'R$ 15,00',
        unit: '500g',
        likes: 0,
      },
    ];
    return await this.productsRepository.createAll(products);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productsRepository.remove(id);
  }
}
