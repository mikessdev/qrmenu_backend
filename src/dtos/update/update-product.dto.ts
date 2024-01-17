import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from '@dtos/create/create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly categoryId: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly image: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly price: string;

  @ApiProperty()
  readonly unit: string;

  @ApiProperty()
  readonly likes: number;

  @ApiProperty()
  readonly createdAt?: Date;

  @ApiProperty()
  readonly updatedAt?: Date;
}
