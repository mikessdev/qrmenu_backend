import { User } from '@database/entities/user.entity';
import { CreateUserDto } from '@dtos/create/create-user.dto';
import { UpdateUserDto } from '@dtos/update/update-user.dto';

export const createUserDto: CreateUserDto = {
  id: '1',
  name: 'Japa',
  lastName: 'da Silva',
  email: 'japa@gmail.com',
  emailVerified: false,
  phoneNumber: '123',
};

export const updateUserDto: UpdateUserDto = {
  id: '1',
  name: 'Fernando',
  lastName: 'Moreira',
  email: 'fernando@gmail.com',
  emailVerified: true,
  phoneNumber: '123',
};

export const addUser = async (user: CreateUserDto) => {
  await User.create(user);
};

export const cleanUser = async () => {
  await User.destroy({ where: {} });
};
