import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '@database/entities/product.entity';
import { Menu } from '@database/entities/menu.entity';

@Table({
  tableName: 'categories',
})
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Menu)
  @Column({
    type: DataType.INTEGER,
  })
  menuId: number;

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

  @HasMany(() => Product, {
    onDelete: 'CASCADE',
    foreignKey: 'categoryId',
  })
  products: Product[];

  @BelongsTo(() => Menu)
  menu: Menu;
}
