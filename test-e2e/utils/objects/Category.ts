import { Category } from '@database/entities/category.entity';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';

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
  await Category.destroy({ where: { id: createCategoryDto.id } });
};
