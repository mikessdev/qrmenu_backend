import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@services/categories.service';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { MenusController } from './menus.controller';
import { MenusService } from '@services/menus.service';

const createMenuDto: CreateMenuDto = {
  id: '1',
  userId: '1',
  headerImg: 'http://menu/image',
  profileImg: 'http://profile/image',
  name: 'Restaurante do Japa',
  url: 'restaurante-do-japa',
  phoneNumber: '1199229922',
  primaryColor: '#DD212',
  instagram: '@restaurantedojapa',
  openDays: 'segunda-sexta',
  address: 'brasil-sp',
};

describe('MenusController', () => {
  let menusController: MenusController;
  let menusServiceMock: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenusController],
      providers: [
        MenusService,
        {
          provide: MenusService,
          useValue: {
            create: jest.fn().mockImplementation((category: CreateMenuDto) => {
              return Promise.resolve(category);
            }),
            findAllByUserId: jest
              .fn()
              .mockResolvedValue([createMenuDto, createMenuDto]),
            findMenuByURL: jest.fn().mockResolvedValue(createMenuDto),
            update: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    menusController = module.get<MenusController>(MenusController);
    menusServiceMock = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(menusController).toBeDefined();
  });

  it('should create a category', () => {
    expect(menusController.create(createMenuDto)).resolves.toEqual(
      createMenuDto,
    );
  });

  it('should return menu by userId', () => {
    const { userId } = createMenuDto;
    expect(menusController.findAllByUserId(userId)).resolves.toEqual([
      createMenuDto,
      createMenuDto,
    ]);
  });

  it('should return menu by URL', () => {
    const { url } = createMenuDto;
    expect(menusController.findMenuByURL(url)).resolves.toEqual(createMenuDto);
  });

  it('should return 1 when a menu is updated', () => {
    const { id } = createMenuDto;
    const requestBody = createMenuDto;
    expect(menusController.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a menu is removed', () => {
    const { id } = createMenuDto;
    expect(menusController.remove(id)).resolves.toEqual(1);
  });
});
