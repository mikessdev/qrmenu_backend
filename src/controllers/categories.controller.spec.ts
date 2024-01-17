import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '@controllers/categories.controller';
import { CategoriesService } from '@services/categories.service';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { Category } from '@database/entities/category.entity';

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
    jest
      .spyOn(categoriesServiceMock, 'findAllWithProducts')
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
            findAllWithProducts: jest
              .fn()
              .mockResolvedValue([createCategoryDto, createCategoryDto]),
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
    const menuId = '1';
    expect(categoriesController.findAllWithProducts(menuId)).resolves.toEqual([
      createCategoryDto,
      createCategoryDto,
    ]);
  });

  it('should return an empty array if there is no category in database ', () => {
    const menuId = '1';
    cleanDataForFindAllMethod(categoriesServiceMock);
    expect(categoriesController.findAllWithProducts(menuId)).resolves.toEqual(
      [],
    );
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
