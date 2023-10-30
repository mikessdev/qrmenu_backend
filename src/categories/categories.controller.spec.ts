import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

const createCategoryDto: CreateCategoryDto = {
  id: '1',
  title: 'Porções',
  menuId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesServiceMock: CategoriesService;

  const cleanDataForFindAllMethod = (
    categoriesServiceMock: CategoriesService,
  ) => {
    const Empty: Category[] = [];
    jest.spyOn(categoriesServiceMock, 'findAll').mockResolvedValue(Empty);
  };

  const cleanDataForFindOneMethod = (
    categoriesServiceMock: CategoriesService,
  ) => {
    const Empty: Category = {} as Category;
    jest
      .spyOn(categoriesServiceMock, 'findOneWithProducts')
      .mockResolvedValue(Empty);
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
            findOneWithProducts: jest.fn().mockResolvedValue(createCategoryDto),
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

  it('should return category by Id if it exists', () => {
    const { id } = createCategoryDto;
    expect(categoriesController.findOneWithProducts(id)).resolves.toEqual(
      createCategoryDto,
    );
  });

  it('should not return category by Id if it not exists', () => {
    const { id } = createCategoryDto;
    cleanDataForFindOneMethod(categoriesServiceMock);
    expect(categoriesController.findOneWithProducts(id)).resolves.toEqual({});
  });

  it('should return 1 when a category is updated', () => {
    const { id } = createCategoryDto;
    const requestBody = createCategoryDto;
    expect(categoriesController.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a category is removed', () => {
    const { id } = createCategoryDto;
    expect(categoriesController.remove(id)).resolves.toEqual(1);
  });
});
