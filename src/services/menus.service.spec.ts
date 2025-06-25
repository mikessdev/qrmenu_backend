import { Test, TestingModule } from '@nestjs/testing';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { MenusService } from '@services/menus.service';
import { MenusRepository } from '@repository/menus.repository';
import { CategoriesService } from './categories.service';
import { ProductsService } from './products.service';
import { Status } from '@utils/enum/status.enum';
import { Menu } from '@database/entities/menu.entity';
import { Category } from '@database/entities/category.entity';

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
            create: jest.fn().mockRejectedValue(new Error()),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
        {
          provide: CategoriesService,
          useValue: {
            createAll: jest.fn().mockResolvedValue([] as Category[]),
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
    jest.spyOn(menuRepository, 'create').mockResolvedValue({} as Menu);
    expect(menusService.create({} as CreateMenuDto)).resolves.toEqual(
      {} as CreateMenuDto,
    );
  });

  it('should not create a menu with categories and products', async () => {
    expect(menusService.create({} as CreateMenuDto)).rejects.toThrow();
  });

  it('should return all of menus', () => {
    const userId = 1;
    expect(menusService.findAllByUserId(userId)).resolves.toEqual(1);
  });

  it('should return menu by URL', () => {
    const url = 'restaurante-do-japa';
    expect(menusService.findMenuByURL(url)).resolves.toEqual(1);
  });

  it('should return 1 when a menu is updated', () => {
    const id = 1;
    const requestBody = {} as CreateMenuDto;
    expect(menusService.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a menu is removed', () => {
    const id = 1;
    expect(menusService.remove(id)).resolves.toEqual(1);
  });
});
