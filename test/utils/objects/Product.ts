import { Product } from '@database/entities/product.entity';
import { CreateProductDto } from '@dtos/create/create-product.dto';

export const createProductDto: CreateProductDto = {
  id: '1',
  categoryId: '1',
  title: 'Iscas de Frango',
  description: '300g de filézinho empanado',
  price: 'R$ 15,00',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const addProduct = async (product: CreateProductDto) => {
  await Product.create(product);
};

export const cleanProduct = async () => {
  await Product.destroy({ where: {} });
};
