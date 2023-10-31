import { Module } from '@nestjs/common';
import { UsersService } from '@services/users.service';
import { UsersController } from '@controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@database/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
