export class CreateProductDto {
  readonly id: string;
  readonly categoryId: string;
  readonly title: string;
  readonly description: string;
  readonly price: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
