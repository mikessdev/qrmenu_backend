import { CreateCategoryDto } from '../../../src/categories/dto/create-category.dto';
import { Category } from '../../../src/categories/entities/category.entity';

export const createCategoryDto: CreateCategoryDto = {
  id: '1',
  menuId: '1',
  title: 'Iscas de Frango',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const addCategory = async (category: CreateCategoryDto) => {
  await Category.create(category);
};

export const cleanCategory = async () => {
  await Category.destroy({ where: {} });
};
