import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'products',
})
export class Product extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  value: string;
}
