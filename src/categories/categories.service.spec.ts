import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
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

  const cleanDataForFindOneMethod = (
    categoriesRepositoryMock: typeof Category,
  ) => {
    const Empty: Category = {} as Category;
    jest.spyOn(categoriesRepositoryMock, 'findByPk').mockResolvedValue(Empty);
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
    expect(categoriesService.findAll()).resolves.toEqual([
      createCategoryDto,
      createCategoryDto,
    ]);
  });

  it('should return an empty array if there is no category in database ', () => {
    cleanDataForFindAllMethod(categoriesRepositoryMock);
    expect(categoriesService.findAll()).resolves.toEqual([]);
  });

  it('should return category by Id if it exists', () => {
    const { id } = createCategoryDto;
    expect(categoriesService.findOneWithProducts(id)).resolves.toEqual(
      createCategoryDto,
    );
  });

  it('should not return category by Id if it not exists', () => {
    const { id } = createCategoryDto;
    cleanDataForFindOneMethod(categoriesRepositoryMock);
    expect(categoriesService.findOneWithProducts(id)).resolves.toEqual({});
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
