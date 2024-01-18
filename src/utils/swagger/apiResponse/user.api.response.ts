import { CreateUserDto } from '@dtos/create/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserApiResponse {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [CreateUserDto],
    example: {
      id: '1f24758c-4942-4c7c-a9c2-52386b394325',
      name: 'Japa',
      lastName: 'da Silva',
      email: 'japa@gmail.com',
      emailVerified: true,
      phoneNumber: '11998824213',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  readonly message: CreateUserDto;
}

export class UserUpdateApiResponse {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [],
    example: [1],
  })
  readonly message: CreateUserDto;
}
