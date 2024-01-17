import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from '@database/entities/category.entity';

@Table({
  tableName: 'products',
})
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.STRING,
    autoIncrement: false,
    allowNull: false,
  })
  categoryId: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
  })
  price: string;

  @Column({
    type: DataType.STRING(18),
    allowNull: false,
  })
  unit: string;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  likes: number;

  @Column({
    type: DataType.DATE(),
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE(),
    allowNull: false,
  })
  updatedAt: Date;

  @BelongsTo(() => Category)
  category: Category;
}
