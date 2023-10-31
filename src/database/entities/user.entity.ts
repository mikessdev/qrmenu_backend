import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { Menu } from '@database/entities/menu.entity';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN(),
    allowNull: false,
  })
  emailVerified: boolean;

  @Column({
    type: DataType.STRING(60),
    allowNull: true,
  })
  phoneNumber: string;

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

  @HasMany(() => Menu)
  menu: Menu[];
}
