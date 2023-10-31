import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@dtos/create/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
