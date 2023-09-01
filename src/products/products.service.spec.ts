import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { getModelToken } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

const createProductDto: CreateProductDto = {
  id: '1',
  categoryId: '1',
  title: 'Iscas de Frango',
  description: '300g de filézinho empanado',
  price: 'R$ 15,00',
  createdAT: new Date(),
  updateAt: new Date(),
};

describe('ProductsService', () => {
  const { id } = createProductDto;
  let productsService: ProductsService;
  let productsRepositoryMock: typeof Product;

  const cleanDataForFindAllMethod = (
    productsRepositoryMock: typeof Product,
  ) => {
    const Empty: Product[] = [];
    jest.spyOn(productsRepositoryMock, 'findAll').mockResolvedValue(Empty);
  };

  const cleanDataForFindOneMethod = (
    productsRepositoryMock: typeof Product,
  ) => {
    const Empty: Product = {} as Product;
    jest.spyOn(productsRepositoryMock, 'findByPk').mockResolvedValue(Empty);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product),
          useValue: {
            create: jest
              .fn()
              .mockImplementation((product: CreateProductDto) => {
                return Promise.resolve(product);
              }),
            findAll: jest
              .fn()
              .mockResolvedValue([createProductDto, createProductDto]),
            findByPk: jest.fn().mockResolvedValue(createProductDto),
            update: jest.fn().mockResolvedValue(1),
            destroy: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepositoryMock = module.get<typeof Product>(getModelToken(Product));
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  it('should create a product', () => {
    expect(productsService.create(createProductDto)).resolves.toEqual(
      createProductDto,
    );
  });

  it('should return all of products', () => {
    expect(productsService.findAllByCategoryId(id)).resolves.toEqual([
      createProductDto,
      createProductDto,
    ]);
  });

  it('should return an empty array if there is no product in database ', () => {
    cleanDataForFindAllMethod(productsRepositoryMock);
    expect(productsService.findAllByCategoryId(id)).resolves.toEqual([]);
  });

  it('should return product by Id if it exists', () => {
    expect(productsService.findOne(id)).resolves.toEqual(createProductDto);
  });

  it('should not return product by Id if it not exists', () => {
    cleanDataForFindOneMethod(productsRepositoryMock);
    expect(productsService.findOne(id)).resolves.toEqual({});
  });

  it('should return 1 when a product is updated', () => {
    const requestBody = createProductDto;
    expect(productsService.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a product is removed', () => {
    expect(productsService.remove(id)).resolves.toEqual(1);
  });
});
