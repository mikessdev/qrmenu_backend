import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@dtos/create/create-user.dto';
import { UpdateUserDto } from '@dtos/update/update-user.dto';
import { UsersRepository } from '@repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
}
