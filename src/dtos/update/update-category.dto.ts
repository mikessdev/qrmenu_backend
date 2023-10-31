import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
