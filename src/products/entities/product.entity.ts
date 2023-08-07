import { Column, Table, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'products',
})
export class Product extends Model {
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
    type: DataType.DATE(11),
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE(11),
    allowNull: false,
  })
  updatedAt: Date;
}
