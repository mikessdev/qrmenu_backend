import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly menuId: string;

  @ApiProperty()
  readonly createdAt?: Date;

  @ApiProperty()
  readonly updatedAt?: Date;
}
