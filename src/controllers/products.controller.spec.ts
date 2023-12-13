import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '@controllers/products.controller';
import { ProductsService } from '@services/products.service';
import { CreateProductDto } from '@dtos/create/create-product.dto';

const createProductDto: CreateProductDto = {
  id: '1',
  categoryId: '1',
  title: 'Iscas de Frango',
  description: '300g de filézinho empanado',
  price: 'R$ 15,00',
  productImg: 'imgURL',
  unit: '500mg',
  likes: 12,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ProductsController', () => {
  let productsController: ProductsController;

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
            update: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  it('should create a product', () => {
    expect(productsController.create(createProductDto)).resolves.toEqual(
      createProductDto,
    );
  });

  it('should return 1 when a product is updated', () => {
    const { id } = createProductDto;
    const requestBody = createProductDto;
    expect(productsController.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a product is removed', () => {
    const { id } = createProductDto;
    expect(productsController.remove(id)).resolves.toEqual(1);
  });
});
