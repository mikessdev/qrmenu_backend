import { Test, TestingModule } from '@nestjs/testing';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { MenusService } from '@services/menus.service';
import { MenusRepository } from '@repository/menus.repository';
import { CategoriesService } from './categories.service';
import { ProductsService } from './products.service';
import { Status } from '@utils/enum/status.enum';

describe('MenusService', () => {
  let menusService: MenusService;
  let menuRepository: MenusRepository;
  let categoriesService: CategoriesService;
  let productsService: ProductsService;

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
            create: jest.fn().mockResolvedValue({
              status: Status.FAILED,
              message: { id: 1 },
            }),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
        {
          provide: CategoriesService,
          useValue: {
            createAll: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: [{ dataValues: { id: 22 } }],
            }),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            createAll: jest.fn(),
          },
        },
      ],
    }).compile();

    menusService = module.get<MenusService>(MenusService);
    menuRepository = module.get<MenusRepository>(MenusRepository);
    categoriesService = module.get<CategoriesService>(CategoriesService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(menusService).toBeDefined();
  });

  it('should create a menu with categories and products', async () => {
    jest.spyOn(menuRepository, 'create').mockResolvedValue({
      status: Status.SUCCESS,
      message: { id: 1 },
    });
    expect(menusService.create({} as CreateMenuDto)).resolves.toEqual({
      status: Status.SUCCESS,
      message: { id: 1 },
    });
  });

  it('should not create a menu with categories and products', async () => {
    expect(menusService.create({} as CreateMenuDto)).resolves.toEqual({
      status: Status.FAILED,
      message: { id: 1 },
    });
  });

  it('should only create a menu without categories and products', async () => {
    jest.spyOn(categoriesService, 'createAll').mockResolvedValue({
      status: Status.FAILED,
      message: [{ dataValues: { id: 1 } }],
    });

    expect(menusService.create({} as CreateMenuDto)).resolves.toEqual({
      status: Status.FAILED,
      message: { id: 1 },
    });
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
