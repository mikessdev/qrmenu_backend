import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { UpdateMenuDto } from '@dtos/update/update-menu.dto';
import { Menu } from '@database/entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectModel(Menu)
    private menuRepository: typeof Menu,
  ) {}
  create(createMenuDto: CreateMenuDto) {
    return this.menuRepository.create(createMenuDto);
  }

  findAllByUserId(userId: string) {
    return this.menuRepository.findAll({ where: { userId: userId } });
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.menuRepository.update(updateMenuDto, {
      where: { id: id },
    });
  }

  remove(id: string) {
    return this.menuRepository.destroy({ where: { id: id } });
  }
}
