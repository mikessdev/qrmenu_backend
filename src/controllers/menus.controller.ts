import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenusService } from '@services/menus.service';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { UpdateMenuDto } from '@dtos/update/update-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get(':id')
  findAllByUserId(@Param('id') id: string) {
    return this.menusService.findAllByUserId(id);
  }

  @Get('url/:url')
  findMenuByURL(@Param('url') url: string) {
    return this.menusService.findMenuByURL(url);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}
