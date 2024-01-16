import { Menu } from '@database/entities/menu.entity';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { UpdateMenuDto } from '@dtos/update/update-menu.dto';

export const createMenuDto: CreateMenuDto = {
  id: '1',
  userId: '1',
  headerImg: 'http://menu/header/image.png',
  profileImg: 'http://menu/profile/image.png',
  name: 'restaurante do Japa',
  primaryColor: '#888DD8',
  phoneNumber: '123123123',
  url: 'restaurante-do-japa',
  instagram: '@restaurantedojapa',
  openDays: 'seg-sex',
  address: 'são paulo',
};

export const updateMenuDto: UpdateMenuDto = {
  id: '1',
  userId: '1',
  headerImg: 'http://menu/header/image.png',
  profileImg: 'http://menu/profile/image.png',
  name: 'restaurante do fernando',
  primaryColor: '#888DD7',
  phoneNumber: '123123123',
  url: 'restaurante-do-fernando',
  instagram: '@restaurantedofernando',
  openDays: 'seg-sex',
  address: 'são paulo',
};

export const addMenu = async (menu: CreateMenuDto) => {
  await Menu.create(menu);
};

export const cleanMenu = async () => {
  await Menu.destroy({ where: {} });
};
