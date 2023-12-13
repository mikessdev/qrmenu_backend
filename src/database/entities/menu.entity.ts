import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '@database/entities/user.entity';
import { Category } from '@database/entities/category.entity';

@Table({
  tableName: 'menus',
})
export class Menu extends Model<Menu> {
  @Column({
    type: DataType.STRING,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    autoIncrement: false,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
  })
  headerImg: string;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
  })
  profileImg: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  primaryColor: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: true,
    defaultValue: '00000000000',
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: true,
  })
  instagram: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: true,
  })
  openDays: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: true,
  })
  address: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Category)
  category: Category[];
}
