import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { UpdateMenuDto } from '@dtos/update/update-menu.dto';
import { MenusRepository } from '@repository/menus.repository';
import { CategoriesService } from './categories.service';
import { ProductsService } from './products.service';

@Injectable()
export class MenusService {
  constructor(
    private readonly menuRepository: MenusRepository,
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    try {
      const menu = await this.menuRepository.create(createMenuDto);
      const resultCategories = await this.categoriesService.createAll(menu.id);

      resultCategories.forEach(async (category) => {
        const categoryId = category.dataValues.id;
        await this.productsService.createAll(categoryId);
      });

      return menu;
    } catch (error) {
      throw error;
    }
  }

  async findAllByUserId(userId: number) {
    return await this.menuRepository.findAllByUserId(userId);
  }

  async findMenuByURL(url: string) {
    return await this.menuRepository.findMenuByURL(url);
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    return await this.menuRepository.update(id, updateMenuDto);
  }

  async remove(id: number) {
    return await this.menuRepository.remove(id);
  }
}
