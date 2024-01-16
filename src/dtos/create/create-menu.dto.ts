import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly userId: string;

  @ApiProperty()
  readonly headerImg: string;

  @ApiProperty()
  readonly profileImg: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly primaryColor: string;

  @ApiProperty()
  readonly url: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly instagram: string;

  @ApiProperty()
  readonly openDays: string;

  @ApiProperty()
  readonly address: string;
}
