import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { UpdateMenuDto } from '@dtos/update/update-menu.dto';
import { Menu } from '@database/entities/menu.entity';
import { Status } from '@utils/enum/status.enum';

@Injectable()
export class MenusRepository {
  constructor(
    @InjectModel(Menu)
    private menu: typeof Menu,
  ) {}
  async create(createMenuDto: CreateMenuDto) {
    try {
      return await this.menu.create(createMenuDto);
    } catch (error) {
      throw error;
    }
  }

  async findAllByUserId(userId: number) {
    try {
      const menus = await this.menu.findAll({ where: { userId: userId } });
      return {
        status: Status.SUCCESS,
        message: menus,
      };
    } catch (error) {
      console.error(error.errors[0].message);
      return {
        status: Status.FAILED,
        message: error.errors[0].message,
      };
    }
  }

  async findMenuByURL(url: string) {
    try {
      const menu = await this.menu.findOne({ where: { url: url } });
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

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    try {
      const result = await this.menu.update(updateMenuDto, {
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

  async remove(id: number) {
    try {
      const result = await this.menu.destroy({ where: { id: id } });
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
