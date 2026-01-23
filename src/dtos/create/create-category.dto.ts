import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  readonly menuId: number;

  @ApiProperty()
  readonly createdAt?: Date;

  @ApiProperty()
  readonly updatedAt?: Date;
}
