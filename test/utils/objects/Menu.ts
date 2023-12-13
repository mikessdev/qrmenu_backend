import { Menu } from '@database/entities/menu.entity';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';

export const createMenuDto: CreateMenuDto = {
  id: '1',
  userId: '1',
  headerImg: 'dddddddddd',
  profileImg: 'ddddddddddddd',
  name: 'restaurant do Japa',
  primaryColor: '#888DD8',
  phoneNumber: '123',
  url: 'sss',
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
