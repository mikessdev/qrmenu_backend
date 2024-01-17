import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryWithProductApiResponses {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [CreateCategoryDto],
    example: [
      {
        id: '1f24758c-4942-4c7c-a9c2-52386b394325',
        menuId: '88b7fedf-59fa-4b02-875d-4345bb74c186',
        title: 'Bebidas',
        products: [
          {
            id: '1f24758c-4942-4c7c-a9c2-52386b394325',
            categoryId: '88b7fedf-59fa-4b02-875d-4345bb74c186',
            title: 'Iscas de Frango',
            image: 'http://product/images',
            description: '300g de filézinho empanado',
            price: 'R$ 15,00',
            unit: '500g',
            likes: 22,
          },
        ],
      },
    ],
  })
  readonly message: CreateCategoryDto;
}

export class CategoryApiResponse {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [CreateCategoryDto],
    example: {
      id: '1f24758c-4942-4c7c-a9c2-52386b394325',
      menuId: '88b7fedf-59fa-4b02-875d-4345bb74c186',
      title: 'Bebidas',
    },
  })
  readonly message: CreateCategoryDto;
}

export class CategoryUpdateApiResponse {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [],
    example: [1],
  })
  readonly message: CreateCategoryDto[];
}
