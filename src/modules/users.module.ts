import { Module } from '@nestjs/common';
import { UsersService } from '@services/users.service';
import { UsersController } from '@controllers/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@database/entities/user.entity';
import { UsersRepository } from '@repository/users.repository';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
