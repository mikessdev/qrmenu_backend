import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
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

describe('CategoriesController', () => {
  const { id } = createCategoryDto;
  let categoriesController: CategoriesController;
  let categoriesServiceMock: CategoriesService;

  const cleanDataForFindAllMethod = (
    categoriesServiceMock: CategoriesService,
  ) => {
    const Empty: Category[] = [];
    jest.spyOn(categoriesServiceMock, 'findAll').mockResolvedValue(Empty);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: CategoriesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((category: CreateCategoryDto) => {
                return Promise.resolve(category);
              }),
            findAll: jest
              .fn()
              .mockResolvedValue([createCategoryDto, createCategoryDto]),
            findOneWithProducts: jest.fn().mockResolvedValue({
              ...createCategoryDto,
              product: [createProductDto],
            }),
            update: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    categoriesController =
      module.get<CategoriesController>(CategoriesController);
    categoriesServiceMock = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });

  it('should create a category', () => {
    expect(categoriesController.create(createCategoryDto)).resolves.toEqual(
      createCategoryDto,
    );
  });

  it('should return all of categories', () => {
    expect(categoriesController.findAll()).resolves.toEqual([
      createCategoryDto,
      createCategoryDto,
    ]);
  });

  it('should return an empty array if there is no category in database ', () => {
    cleanDataForFindAllMethod(categoriesServiceMock);
    expect(categoriesController.findAll()).resolves.toEqual([]);
  });

  it('should return one categories whith all products related', () => {
    expect(categoriesController.findOneWithProducts(id)).resolves.toEqual({
      ...createCategoryDto,
      product: [createProductDto],
    });
  });

  it('should return 1 when a category is updated', () => {
    const requestBody = createCategoryDto;
    expect(categoriesController.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a category is removed', () => {
    expect(categoriesController.remove(id)).resolves.toEqual(1);
  });
});
