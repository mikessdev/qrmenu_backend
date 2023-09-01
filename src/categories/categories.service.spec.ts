import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { getModelToken } from '@nestjs/sequelize';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

const createCategoryDto: CreateCategoryDto = {
  id: '1',
  title: 'Porções',
  createdAT: new Date(),
  updateAt: new Date(),
};

const createProductDto: CreateProductDto = {
  id: '1',
  categoryId: '1',
  title: 'Iscas de Frango',
  description: '300g de filézinho empanado',
  price: 'R$ 15,00',
  createdAT: new Date(),
  updateAt: new Date(),
};

describe('CategoriesService', () => {
  const { id } = createCategoryDto;
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

            findByPk: jest.fn().mockResolvedValue({
              ...createCategoryDto,
              product: [createProductDto],
            }),
            findAll: jest
              .fn()
              .mockResolvedValue([createCategoryDto, createCategoryDto]),
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

  it('should return one categories whith all products related', () => {
    expect(categoriesService.findOneWithProducts(id)).resolves.toEqual({
      ...createCategoryDto,
      product: [createProductDto],
    });
  });

  it('should return 1 when a category is updated', () => {
    const requestBody = createCategoryDto;
    expect(categoriesService.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a category is removed', () => {
    expect(categoriesService.remove(id)).resolves.toEqual(1);
  });
});
