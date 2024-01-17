import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@services/categories.service';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { CategoriesRepository } from '@repository/categories.repository';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepository,
          useValue: {
            findAllWithProducts: jest.fn().mockResolvedValue(1),
            update: jest.fn().mockResolvedValue(1),
            create: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });

  it('should create a category', () => {
    expect(categoriesService.create({} as CreateCategoryDto)).resolves.toEqual(
      1,
    );
  });

  it('should return all of categories', () => {
    const menuId = '1';
    expect(categoriesService.findAllWithProducts(menuId)).resolves.toEqual(1);
  });

  it('should return 1 when a category is updated', () => {
    const id = '1';
    expect(
      categoriesService.update(id, {} as CreateCategoryDto),
    ).resolves.toEqual(1);
  });

  it('should return 1 when a category is removed', () => {
    const id = '1';
    expect(categoriesService.remove(id)).resolves.toEqual(1);
  });
});
