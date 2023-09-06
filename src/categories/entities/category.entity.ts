import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from '../../products/entities/product.entity';

@Table({
  tableName: 'categories',
})
export class Category extends Model<Category> {
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

  @Column({
    type: DataType.DATE(11),
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE(11),
    allowNull: false,
  })
  updatedAt: Date;

  @HasMany(() => Product)
  product: Product[];
}
