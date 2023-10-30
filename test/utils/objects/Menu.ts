import { Menu } from '../../../src/menus/entities/menu.entity';
import { CreateMenuDto } from '../../../src/menus/dto/create-menu.dto';

export const createMenuDto: CreateMenuDto = {
  id: '1',
  userId: '1',
  headerImg: 'dddddddddd',
  profileImg: 'ddddddddddddd',
  name: 'restaurant do Japa',
  phoneNumber: '123',
  instagram: 'dddddddddddd',
  openDays: 'ddddddddd',
  address: 'dddddddddd',
};

export const addMenu = async (menu: CreateMenuDto) => {
  await Menu.create(menu);
};

export const cleanMenu = async () => {
  await Menu.destroy({ where: {} });
};
