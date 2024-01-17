import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@services/categories.service';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { Category } from '@database/entities/category.entity';
import { getModelToken } from '@nestjs/sequelize';

const createCategoryDto: CreateCategoryDto = {
  id: '1',
  title: 'Porções',
  menuId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoriesRepositoryMock: typeof Category;

  const cleanDataForFindAllMethod = (
    categoriesRepositoryMock: typeof Category,
  ) => {
    const Empty: Category[] = [];
    jest.spyOn(categoriesRepositoryMock, 'findAll').mockResolvedValue(Empty);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Category),
          useValue: {
            create: jest
              .fn()
              .mockImplementation((category: CreateCategoryDto) => {
                return Promise.resolve(category);
              }),
            findAll: jest
              .fn()
              .mockResolvedValue([createCategoryDto, createCategoryDto]),
            findByPk: jest.fn().mockResolvedValue(createCategoryDto),
            update: jest.fn().mockResolvedValue(1),
            destroy: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoriesRepositoryMock = module.get<typeof Category>(
      getModelToken(Category),
    );
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  it('should create a category', () => {
    expect(categoriesService.create(createCategoryDto)).resolves.toEqual(
      createCategoryDto,
    );
  });

  it('should return all of categories', () => {
    const menuId = '1';
    expect(categoriesService.findAllWithProducts(menuId)).resolves.toEqual([
      createCategoryDto,
      createCategoryDto,
    ]);
  });

  it('should return an empty array if there is no category in database ', () => {
    const menuId = '1';
    cleanDataForFindAllMethod(categoriesRepositoryMock);
    expect(categoriesService.findAllWithProducts(menuId)).resolves.toEqual([]);
  });

  it('should return 1 when a category is updated', () => {
    const { id } = createCategoryDto;
    const requestBody = createCategoryDto;
    expect(categoriesService.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a category is removed', () => {
    const { id } = createCategoryDto;
    expect(categoriesService.remove(id)).resolves.toEqual(1);
  });
});
