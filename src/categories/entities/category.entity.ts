import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
