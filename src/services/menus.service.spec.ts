import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { MenusService } from '@services/menus.service';
import { Menu } from '@database/entities/menu.entity';

const createMenuDto: CreateMenuDto = {
  id: '1',
  userId: '1',
  headerImg: 'dddddddddd',
  profileImg: 'ddddddddddddd',
  name: 'restaurant do Japa',
  url: 'test-test',
  phoneNumber: '123',
  instagram: 'dddddddddddd',
  openDays: 'ddddddddd',
  address: 'dddddddddd',
};

describe('MenusService', () => {
  let menusService: MenusService;
  let menusRepositoryMock: typeof Menu;

  const cleanDataForFindAllMethod = (menusRepositoryMock: typeof Menu) => {
    const Empty: Menu[] = [];
    jest.spyOn(menusRepositoryMock, 'findAll').mockResolvedValue(Empty);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        {
          provide: getModelToken(Menu),
          useValue: {
            create: jest.fn().mockImplementation((menu: CreateMenuDto) => {
              return Promise.resolve(menu);
            }),
            findAll: jest
              .fn()
              .mockResolvedValue([createMenuDto, createMenuDto]),
            findByPk: jest.fn().mockResolvedValue(createMenuDto),
            update: jest.fn().mockResolvedValue(1),
            destroy: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    menusService = module.get<MenusService>(MenusService);
    menusRepositoryMock = module.get<typeof Menu>(getModelToken(Menu));
  });

  it('should be defined', () => {
    expect(menusService).toBeDefined();
  });

  it('should create a menu', () => {
    expect(menusService.create(createMenuDto)).resolves.toEqual(createMenuDto);
  });

  it('should return all of menus', () => {
    const userId = '1';
    expect(menusService.findAllByUserId(userId)).resolves.toEqual([
      createMenuDto,
      createMenuDto,
    ]);
  });

  it('should return an empty array if there is no menu in database ', () => {
    cleanDataForFindAllMethod(menusRepositoryMock);
    const userId = '1';
    expect(menusService.findAllByUserId(userId)).resolves.toEqual([]);
  });

  //   it('should return category by Id if it exists', () => {
  //     const { id } = createCategoryDto;
  //     expect(categoriesService.findOneWithProducts(id)).resolves.toEqual(
  //       createCategoryDto,
  //     );
  //   });

  //   it('should not return category by Id if it not exists', () => {
  //     const { id } = createCategoryDto;
  //     cleanDataForFindOneMethod(categoriesRepositoryMock);
  //     expect(categoriesService.findOneWithProducts(id)).resolves.toEqual({});
  //   });

  //   it('should return 1 when a category is updated', () => {
  //     const { id } = createCategoryDto;
  //     const requestBody = createCategoryDto;
  //     expect(categoriesService.update(id, requestBody)).resolves.toEqual(1);
  //   });

  //   it('should return 1 when a category is removed', () => {
  //     const { id } = createCategoryDto;
  //     expect(categoriesService.remove(id)).resolves.toEqual(1);
  //   });
});
