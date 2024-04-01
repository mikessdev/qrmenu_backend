import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { UpdateCategoryDto } from '@dtos/update/update-category.dto';
import { CategoriesRepository } from '@repository/categories.repository';
import { randomUUID as uuid } from 'crypto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createAll(menuId: string) {
    const categories: CreateCategoryDto[] = [
      { id: uuid(), menuId, title: 'Pratos principais' },
      { id: uuid(), menuId, title: 'Bebidas' },
      { id: uuid(), menuId, title: 'Sobremesas' },
    ];

    return await this.categoriesRepository.createAll(categories);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.create(createCategoryDto);
  }

  async findAllWithProducts(menuId: string) {
    return await this.categoriesRepository.findAllWithProducts(menuId);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    return await this.categoriesRepository.remove(id);
  }
}
