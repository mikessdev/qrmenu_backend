import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from '@dtos/create/create-user.dto';
import { UpdateUserDto } from '@dtos/update/update-user.dto';
import { User } from '@database/entities/user.entity';
import { Status } from '@utils/enum/status.enum';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private user: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const menu = await this.user.create(createUserDto);
      return {
        status: Status.SUCCESS,
        message: menu,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.user.findByPk(id);
      return {
        status: Status.SUCCESS,
        message: user,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.user.update(updateUserDto, {
        where: { id: id },
      });
      return {
        status: Status.SUCCESS,
        message: result,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }

  async remove(id: string) {
    try {
      const result = await this.user.destroy({ where: { id: id } });
      return {
        status: Status.SUCCESS,
        message: result,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }
}
