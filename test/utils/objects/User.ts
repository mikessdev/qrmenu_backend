import { User } from '../../../src/users/entities/user.entity';
import { CreateUserDto } from '../../../src/users/dto/create-user.dto';

export const createUserDto: CreateUserDto = {
  id: '1',
  name: 'Japa',
  lastName: 'da Silva',
  email: 'japa@gmail.com',
  emailVerified: false,
  phoneNumber: '123',
};

export const addUser = async (user: CreateUserDto) => {
  await User.create(user);
};

export const cleanUser = async () => {
  await User.destroy({ where: {} });
};
