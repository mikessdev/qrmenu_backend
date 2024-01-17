import { ProductsService } from '@services/products.service';
import { CreateProductDto, Result } from '@dtos/create/create-product.dto';
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
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Status } from '@utils/enum/status.enum';
import { Response } from 'express';

@ApiTags('product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('categoryId') categoryId: string) {
    return this.productsService.findAll(categoryId);
  }

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Result,
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
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token for authentication',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
