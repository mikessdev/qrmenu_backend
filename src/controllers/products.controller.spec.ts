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
            findAll: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: [createProductDto],
            }),
            create: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: createProductDto,
            }),
            update: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: {},
            }),
            remove: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: {},
            }),
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

  it('should update a product', async () => {
    const { id } = createProductDto;
    const requestBody = createProductDto;

    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await productsController.update(response, id, requestBody);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: {},
      }),
    );
  });

  it('should handle a failed product update', async () => {
    jest.spyOn(productsService, 'update').mockResolvedValueOnce({
      status: Status.FAILED,
      message: 'Failed To Update Product',
    });

    const { id } = createProductDto;
    const requestBody = createProductDto;

    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await productsController.update(response, id, requestBody);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.FAILED,
        message: 'Failed To Update Product',
      }),
    );
  });

  it('should remove a product', async () => {
    const { id } = createProductDto;

    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await productsController.remove(response, id);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
  });

  it('should handle a failed product remove', async () => {
    jest.spyOn(productsService, 'remove').mockResolvedValueOnce({
      status: Status.FAILED,
      message: 'Failed To Update Product',
    });

    const { id } = createProductDto;

    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await productsController.remove(response, id);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should return all products by categoryId', async () => {
    const { categoryId } = createProductDto;

    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await productsController.findAll(response, categoryId);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: [createProductDto],
      }),
    );
  });

  it('should handle a failed product find all by category', async () => {
    jest.spyOn(productsService, 'findAll').mockResolvedValueOnce({
      status: Status.FAILED,
      message: 'Failed Find ALL Products By CategoryId',
    });

    const { categoryId } = createProductDto;

    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await productsController.findAll(response, categoryId);
    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.FAILED,
        message: 'Failed Find ALL Products By CategoryId',
      }),
    );
  });
});
