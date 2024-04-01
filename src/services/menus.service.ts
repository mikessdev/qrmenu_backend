import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { UpdateMenuDto } from '@dtos/update/update-menu.dto';
import { MenusRepository } from '@repository/menus.repository';
import { CategoriesService } from './categories.service';
import { Status } from '@utils/enum/status.enum';
import { ProductsService } from './products.service';

@Injectable()
export class MenusService {
  constructor(
    private readonly menuRepository: MenusRepository,
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    const resultMenu = await this.menuRepository.create(createMenuDto);

    if (resultMenu.status === Status.FAILED) {
      return resultMenu;
    }

    const resultCategories = await this.categoriesService.createAll(
      resultMenu.message.id,
    );

    if (resultCategories.status === Status.FAILED) {
      return resultMenu;
    }

    resultCategories.message.forEach(async (category) => {
      const categoryId = category.dataValues.id;
      await this.productsService.createAll(categoryId);
    });

    return resultMenu;
  }

  async findAllByUserId(userId: string) {
    return await this.menuRepository.findAllByUserId(userId);
  }

  async findMenuByURL(url: string) {
    return await this.menuRepository.findMenuByURL(url);
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    return await this.menuRepository.update(id, updateMenuDto);
  }

  async remove(id: string) {
    return await this.menuRepository.remove(id);
  }
}
