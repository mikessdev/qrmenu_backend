import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryRepository: typeof Category,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  findOneWithProducts(id: string) {
    return this.categoryRepository.findByPk(id, {
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
