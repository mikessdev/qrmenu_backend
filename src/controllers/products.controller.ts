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
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':categoryId')
  findAll(@Param('categoryId') categoryId: string) {
    return this.productsService.findAll(categoryId);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
