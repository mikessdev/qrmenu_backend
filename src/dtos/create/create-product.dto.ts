export class CreateProductDto {
  readonly id: string;
  readonly categoryId: string;
  readonly title: string;
  readonly productImg: string;
  readonly description: string;
  readonly price: string;
  readonly unit: string;
  readonly likes: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
