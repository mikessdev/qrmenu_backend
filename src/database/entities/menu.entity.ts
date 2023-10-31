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
    type: DataType.STRING(150),
    allowNull: false,
  })
  headerImg: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  profileImg: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  instagram: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  openDays: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  address: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Category)
  category: Category[];
}
