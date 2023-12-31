import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { UpdateCategoryDto } from '@dtos/update/update-category.dto';
import { Category } from '@database/entities/category.entity';
import { Product } from '@database/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryRepository: typeof Category,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
  }

  findAllIncludingProducts(menuId: string) {
    return this.categoryRepository.findAll({
      where: { menuId: menuId },
      order: [['createdAt', 'ASC']],
      include: { model: Product },
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(updateCategoryDto, {
      where: { id: id },
    });
  }

  remove(id: string) {
    return this.categoryRepository.destroy({ where: { id: id } });
  }
}
