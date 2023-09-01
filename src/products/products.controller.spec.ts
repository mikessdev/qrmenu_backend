import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
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

describe('ProductsController', () => {
  const { id } = createProductDto;
  let productsController: ProductsController;
  let productsServiceMock: ProductsService;

  const cleanDataForFindAllMethod = (productsServiceMock: ProductsService) => {
    const Empty: Product[] = [];
    jest
      .spyOn(productsServiceMock, 'findAllByCategoryId')
      .mockResolvedValue(Empty);
  };

  const cleanDataForFindOneMethod = (productsServiceMock: ProductsService) => {
    const Empty: Product = {} as Product;
    jest.spyOn(productsServiceMock, 'findOne').mockResolvedValue(Empty);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: ProductsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((product: CreateProductDto) => {
                return Promise.resolve(product);
              }),
            findAllByCategoryId: jest
              .fn()
              .mockResolvedValue([createProductDto, createProductDto]),
            findOne: jest.fn().mockResolvedValue(createProductDto),
            update: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsServiceMock = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  it('should create a product', () => {
    expect(productsController.create(createProductDto)).resolves.toEqual(
      createProductDto,
    );
  });

  it('should return all of products', () => {
    expect(productsController.findAllByCategoryId(id)).resolves.toEqual([
      createProductDto,
      createProductDto,
    ]);
  });

  it('should return an empty array if there is no product in database ', () => {
    cleanDataForFindAllMethod(productsServiceMock);
    expect(productsController.findAllByCategoryId(id)).resolves.toEqual([]);
  });

  it('should return product by Id if it exists', () => {
    expect(productsController.findOne(id)).resolves.toEqual(createProductDto);
  });

  it('should not return product by Id if it not exists', () => {
    cleanDataForFindOneMethod(productsServiceMock);
    expect(productsController.findOne(id)).resolves.toEqual({});
  });

  it('should return 1 when a product is updated', () => {
    const requestBody = createProductDto;
    expect(productsController.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a product is removed', () => {
    expect(productsController.remove(id)).resolves.toEqual(1);
  });
});
