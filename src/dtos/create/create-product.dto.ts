import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
