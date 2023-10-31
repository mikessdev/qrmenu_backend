import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '@dtos/create/create-user.dto';
import { UpdateUserDto } from '@dtos/update/update-user.dto';
import { User } from '@database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findOne(id: string) {
    return this.userRepository.findByPk(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(updateUserDto, { where: { id: id } });
  }

  remove(id: string) {
    return this.userRepository.destroy({ where: { id: id } });
  }
}
