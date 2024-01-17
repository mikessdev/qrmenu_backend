import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '@services/products.service';
import { CreateProductDto } from '@dtos/create/create-product.dto';
import { ProductsRepository } from '@repository/product.repository';

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(1),
            update: jest.fn().mockResolvedValue(1),
            create: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  it('should create a product', async () => {
    const result = await productsService.create({} as CreateProductDto);
    expect(result).toBe(1);
  });

  it('should return all products by categoryId', async () => {
    const categoryId = '1';
    const result = await productsService.findAll(categoryId);
    expect(result).toBe(1);
  });

  it('should return 1 when a product is updated', async () => {
    const id = '1';
    const requestBody = {} as CreateProductDto;
    const result = await productsService.update(id, requestBody);
    expect(result).toBe(1);
  });

  it('should return 1 when a product is removed', async () => {
    const id = '1';
    const result = await productsService.remove(id);
    expect(result).toBe(1);
  });
});
