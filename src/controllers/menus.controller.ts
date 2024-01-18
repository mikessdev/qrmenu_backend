import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { MenusService } from '@services/menus.service';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { UpdateMenuDto } from '@dtos/update/update-menu.dto';
import {
  ApiBody,
  ApiHeader,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  MenuApiResponse,
  MenuApiResponses,
  MenuUpdateApiResponse,
} from '@utils/swagger/apiResponse/menus.api.response';
import { Status } from '@utils/enum/status.enum';
import { Response } from 'express';

@ApiTags('menu')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  @ApiQuery({
    name: 'url',
    description: 'url name of the menu',
    type: String,
    required: true,
    example: 'restaurante-do-japa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MenuApiResponse,
  })
  async findMenuByURL(@Res() response: Response, @Query('url') url: string) {
    const menu = await this.menusService.findMenuByURL(url);

    if (menu.status === Status.SUCCESS) {
      return response.status(HttpStatus.OK).send(JSON.stringify(menu));
    }
    if (menu.status === Status.FAILED) {
      return response.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(menu));
    }
  }

  @Get(':userId')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MenuApiResponses,
  })
  async findAllByUserId(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    const menu = await this.menusService.findAllByUserId(userId);
    if (menu.status === Status.SUCCESS) {
      return response.status(HttpStatus.OK).send(JSON.stringify(menu));
    }
    if (menu.status === Status.FAILED) {
      return response.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(menu));
    }
  }
  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MenuApiResponse,
  })
  async create(
    @Res() response: Response,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    const result = await this.menusService.create(createMenuDto);
    if (result.status === Status.SUCCESS) {
      return response.status(HttpStatus.CREATED).send(JSON.stringify(result));
    }
    if (result.status === Status.FAILED) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(JSON.stringify(result));
    }
  }

  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MenuUpdateApiResponse,
  })
  @ApiBody({ type: UpdateMenuDto })
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    const result = await this.menusService.update(id, updateMenuDto);

    if (result.status === Status.SUCCESS) {
      return response.status(HttpStatus.OK).send(JSON.stringify(result));
    }
    if (result.status === Status.FAILED) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(JSON.stringify(result));
    }
  }

  @Delete(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Res() response: Response, @Param('id') id: string) {
    const result = await this.menusService.remove(id);

    if (result.status === Status.SUCCESS) {
      return response.status(HttpStatus.NO_CONTENT).send();
    }
    if (result.status === Status.FAILED) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(JSON.stringify(result));
    }
  }
}
