import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MenuApiResponse {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [CreateMenuDto],
    example: {
      id: '1f24758c-4942-4c7c-a9c2-52386b394325',
      userId: '88b7fedf-59fa-4b02-875d-4345bb74c186',
      headerImg: 'http://menu/header/image.png',
      profileImg: 'http://menu/profile/image.png',
      name: 'restaurante do Japa',
      color: '#888DD8',
      phoneNumber: '123123123',
      url: 'restaurante-do-japa',
      instagram: '@restaurantedojapa',
      openDays: 'seg-sex',
      address: 'são paulo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  readonly message: CreateMenuDto;
}

export class MenuApiResponses {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [CreateMenuDto],
    example: [
      {
        id: '1f24758c-4942-4c7c-a9c2-52386b394325',
        userId: '88b7fedf-59fa-4b02-875d-4345bb74c186',
        headerImg: 'http://menu/header/image.png',
        profileImg: 'http://menu/profile/image.png',
        name: 'restaurante do Japa',
        color: '#888DD8',
        phoneNumber: '123123123',
        url: 'restaurante-do-japa',
        instagram: '@restaurantedojapa',
        openDays: 'seg-sex',
        address: 'são paulo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })
  readonly message: CreateMenuDto;
}

export class MenuUpdateApiResponse {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [],
    example: [1],
  })
  readonly message: CreateMenuDto[];
}
