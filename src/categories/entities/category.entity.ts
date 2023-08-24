import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';

@Table
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  title: string;

  @HasMany(() => Product)
  product: Product[];
}
