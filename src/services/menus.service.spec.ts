import { Test, TestingModule } from '@nestjs/testing';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { MenusService } from '@services/menus.service';
import { MenusRepository } from '@repository/menus.repository';

describe('MenusService', () => {
  let menusService: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        {
          provide: MenusRepository,
          useValue: {
            findAllByUserId: jest.fn().mockResolvedValue(1),
            findMenuByURL: jest.fn().mockResolvedValue(1),
            update: jest.fn().mockResolvedValue(1),
            create: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    menusService = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(menusService).toBeDefined();
  });

  it('should create a menu', async () => {
    expect(menusService.create({} as CreateMenuDto)).resolves.toEqual(1);
  });

  it('should return all of menus', () => {
    const userId = '1';
    expect(menusService.findAllByUserId(userId)).resolves.toEqual(1);
  });

  it('should return an empty array if there is no menu in database ', () => {
    const userId = '1';
    expect(menusService.findAllByUserId(userId)).resolves.toEqual(1);
  });

  it('should return menu by URL', () => {
    const url = 'restaurante-do-japa';
    expect(menusService.findMenuByURL(url)).resolves.toEqual(1);
  });

  it('should return 1 when a menu is updated', () => {
    const id = '1';
    const requestBody = {} as CreateMenuDto;
    expect(menusService.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a menu is removed', () => {
    const id = '1';
    expect(menusService.remove(id)).resolves.toEqual(1);
  });
});
