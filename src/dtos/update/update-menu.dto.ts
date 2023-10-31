import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
