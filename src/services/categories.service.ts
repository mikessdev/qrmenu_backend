import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { UpdateCategoryDto } from '@dtos/update/update-category.dto';
import { CategoriesRepository } from '@repository/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

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
