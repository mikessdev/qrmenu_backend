import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { UpdateCategoryDto } from '@dtos/update/update-category.dto';
import { CategoriesRepository } from '@repository/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createAll(menuId: number) {
    const categories: CreateCategoryDto[] = [
      { menuId, title: 'Pratos principais' },
      { menuId, title: 'Bebidas' },
      { menuId, title: 'Sobremesas' },
    ];
    try {
      return await this.categoriesRepository.createAll(categories);
    } catch (error) {
      throw error;
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.create(createCategoryDto);
  }

  async findAllWithProducts(menuId: number) {
    return await this.categoriesRepository.findAllWithProducts(menuId);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoriesRepository.remove(id);
  }
}
