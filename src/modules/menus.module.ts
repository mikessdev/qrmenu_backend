import { Module } from '@nestjs/common';
import { MenusService } from '@services/menus.service';
import { MenusController } from '@controllers/menus.controller';
import { Menu } from '@database/entities/menu.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenusRepository } from '@repository/menus.repository';

@Module({
  imports: [SequelizeModule.forFeature([Menu])],
  controllers: [MenusController],
  providers: [MenusService, MenusRepository],
})
export class MenusModule {}
