import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from '@dtos/create/create-product.dto';

export class ProductApiResponse {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [CreateProductDto],
    example: {
      id: '1f24758c-4942-4c7c-a9c2-52386b394325',
      categoryId: '88b7fedf-59fa-4b02-875d-4345bb74c186',
      title: 'Iscas de Frango',
      image: 'http://product/images',
      description: '300g de filézinho empanado',
      price: 'R$ 15,00',
      unit: '500g',
      likes: 22,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
  readonly message: CreateProductDto;
}

export class ProductApiResponses {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [CreateProductDto],
    example: [
      {
        id: '1f24758c-4942-4c7c-a9c2-52386b394325',
        categoryId: '88b7fedf-59fa-4b02-875d-4345bb74c186',
        title: 'Iscas de Frango',
        image: 'http://product/images',
        description: '300g de filézinho empanado',
        price: 'R$ 15,00',
        unit: '500g',
        likes: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  })
  readonly message: CreateProductDto[];
}

export class ProductUpdateApiResponses {
  @ApiProperty({ example: 'success' })
  readonly status: string;
  @ApiProperty({
    type: [],
    example: [1],
  })
  readonly message: CreateProductDto[];
}
