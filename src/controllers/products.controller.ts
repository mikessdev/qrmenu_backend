import { ProductsService } from '@services/products.service';
import { CreateProductDto } from '@dtos/create/create-product.dto';
import { UpdateProductDto } from '@dtos/update/update-product.dto';
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
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
import { Status } from '@utils/enum/status.enum';
import { Response } from 'express';
import {
  ProductApiResponse,
  ProductApiResponses,
  ProductUpdateApiResponses,
} from '@utils/swagger/apiResponse/product.api.response';

@ApiTags('product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiQuery({
    name: 'categoryId',
    description: 'ID of the category',
    type: String,
    required: true,
    example: '88b7fedf-59fa-4b02-875d-4345bb74c186',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductApiResponses,
  })
  async findAll(
    @Res() response: Response,
    @Query('categoryId') categoryId: string,
  ) {
    const result = await this.productsService.findAll(categoryId);
    if (result.status === Status.SUCCESS) {
      return response.status(HttpStatus.OK).send(JSON.stringify(result));
    }
    if (result.status === Status.FAILED) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(JSON.stringify(result));
    }
  }

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ProductApiResponse,
  })
  async create(
    @Res() response: Response,
    @Body() createProductDto: CreateProductDto,
  ) {
    const result = await this.productsService.create(createProductDto);
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
    type: ProductUpdateApiResponses,
  })
  @ApiBody({ type: UpdateProductDto })
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const result = await this.productsService.update(id, updateProductDto);
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
    const result = await this.productsService.remove(id);

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
