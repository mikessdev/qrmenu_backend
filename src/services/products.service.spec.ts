import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '@services/products.service';
import { CreateProductDto } from '@dtos/create/create-product.dto';
import { getModelToken } from '@nestjs/sequelize';
import { Product } from '@database/entities/product.entity';

const createProductDto: CreateProductDto = {
  id: '1',
  categoryId: '1',
  title: 'Iscas de Frango',
  description: '300g de filézinho empanado',
  price: 'R$ 15,00',
  productImg: 'imgURL',
  likes: 22,
  unit: '500 kg',
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
            findAll: jest
              .fn()
              .mockResolvedValue([createProductDto, createProductDto]),
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

  it('should return all products by categoryId', () => {
    const { categoryId } = createProductDto;
    expect(productsService.findAll(categoryId)).resolves.toEqual([
      createProductDto,
      createProductDto,
    ]);
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
