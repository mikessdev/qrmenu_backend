import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { UpdateMenuDto } from '@dtos/update/update-menu.dto';
import { MenusRepository } from '@repository/menus.repository';

@Injectable()
export class MenusService {
  constructor(private readonly menuRepository: MenusRepository) {}
  async create(createMenuDto: CreateMenuDto) {
    return await this.menuRepository.create(createMenuDto);
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
