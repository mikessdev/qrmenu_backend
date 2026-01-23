import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly menuId: number;

  @ApiProperty()
  readonly createdAt?: Date;

  @ApiProperty()
  readonly updatedAt?: Date;
}
