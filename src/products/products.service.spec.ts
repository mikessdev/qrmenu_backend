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
  let productsService: ProductsService;

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
            update: jest.fn().mockResolvedValue(1),
            destroy: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  it('should create a product', () => {
    expect(productsService.create(createProductDto)).resolves.toEqual(
      createProductDto,
    );
  });

  it('should return 1 when a product is updated', () => {
    const { id } = createProductDto;
    const requestBody = createProductDto;
    expect(productsService.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a product is removed', () => {
    const { id } = createProductDto;
    expect(productsService.remove(id)).resolves.toEqual(1);
  });
});
