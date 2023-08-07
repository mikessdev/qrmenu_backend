export class CreateProductDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: string;
  readonly createdAT: Date;
  readonly updateAt: Date;
}
