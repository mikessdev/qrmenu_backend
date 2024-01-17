import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CategoryApiResponse,
  CategoryUpdateApiResponse,
  CategoryWithProductApiResponses,
} from '@utils/swagger/apiResponse/category.api.response';
import { CategoriesService } from '@services/categories.service';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { UpdateCategoryDto } from '@dtos/update/update-category.dto';
import { Status } from '@utils/enum/status.enum';
import { Response } from 'express';

@ApiTags('category')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiQuery({
    name: 'menuId',
    description: 'ID of the menu',
    type: String,
    required: true,
    example: '88b7fedf-59fa-4b02-875d-4345bb74c186',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CategoryWithProductApiResponses,
  })
  async findAllWithProducts(
    @Res() response: Response,
    @Query('menuId') menuId: string,
  ) {
    const categories = await this.categoriesService.findAllWithProducts(menuId);

    if (categories.status === Status.SUCCESS) {
      return response.status(HttpStatus.OK).send(JSON.stringify(categories));
    }
    if (categories.status === Status.FAILED) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(JSON.stringify(categories));
    }
  }

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CategoryApiResponse,
  })
  async create(
    @Res() response: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const result = await this.categoriesService.create(createCategoryDto);

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
    type: CategoryUpdateApiResponse,
  })
  @ApiBody({ type: UpdateCategoryDto })
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.categoriesService.update(id, updateCategoryDto);

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
    const result = await this.categoriesService.remove(id);
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
