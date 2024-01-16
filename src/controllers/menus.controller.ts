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
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('menu')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get(':userId')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  findAllByUserId(@Param('userId') userId: string) {
    return this.menusService.findAllByUserId(userId);
  }

  @Get('url/:url')
  findMenuByURL(@Param('url') url: string) {
    return this.menusService.findMenuByURL(url);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}
