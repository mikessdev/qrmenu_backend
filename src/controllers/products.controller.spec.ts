import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '@controllers/products.controller';
import { ProductsService } from '@services/products.service';
import { CreateProductDto } from '@dtos/create/create-product.dto';
import { Response } from 'express';
import { Status } from '@utils/enum/status.enum';
import { HttpStatus } from '@nestjs/common';

const createProductDto: CreateProductDto = {
  id: '1',
  categoryId: '1',
  title: 'Iscas de Frango',
  description: '300g de filézinho empanado',
  price: 'R$ 15,00',
  image: 'http://products/image',
  unit: '500g',
  likes: 12,
};

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue([createProductDto, createProductDto]),
            create: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: createProductDto,
            }),
            update: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  it('should create a product with success', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await productsController.create(response, createProductDto);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: createProductDto,
      }),
    );
  });

  it('should handle a failed product creation', async () => {
    jest.spyOn(productsService, 'create').mockResolvedValueOnce({
      status: Status.FAILED,
      message: 'Failed to create product',
    });
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await productsController.create(response, createProductDto);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.FAILED,
        message: 'Failed to create product',
      }),
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

  it('should return all products by categoryId', () => {
    const { categoryId } = createProductDto;
    expect(productsController.findAll(categoryId)).resolves.toEqual([
      createProductDto,
      createProductDto,
    ]);
  });
});
