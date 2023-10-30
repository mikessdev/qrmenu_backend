import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectModel(Menu)
    private userRepository: typeof Menu,
  ) {}
  create(createMenuDto: CreateMenuDto) {
    return this.userRepository.create(createMenuDto);
  }

  findAll(userId: string) {
    return this.userRepository.findAll({ where: { userId: userId } });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.userRepository.update(updateMenuDto, {
      where: { id: id },
    });
  }

  remove(id: number) {
    return this.userRepository.destroy({ where: { id: id } });
  }
}
