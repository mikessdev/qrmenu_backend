import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '@controllers/categories.controller';
import { CategoriesService } from '@services/categories.service';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { Status } from '@utils/enum/status.enum';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

const createCategoryDto: CreateCategoryDto = {
  id: '1',
  title: 'Porções',
  menuId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: CategoriesService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: createCategoryDto,
            }),
            findAllWithProducts: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: [createCategoryDto],
            }),
            update: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: [],
            }),
            remove: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: [],
            }),
          },
        },
      ],
    }).compile();

    categoriesController =
      module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });

  it('should create a category with success', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await categoriesController.create(response, createCategoryDto);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: createCategoryDto,
      }),
    );
  });

  it('should return all of categories', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { menuId } = createCategoryDto;
    await categoriesController.findAllWithProducts(response, menuId);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: [createCategoryDto],
      }),
    );
  });

  it('should return an empty array if there is no category in database ', async () => {
    jest.spyOn(categoriesService, 'findAllWithProducts').mockResolvedValueOnce({
      status: Status.SUCCESS,
      message: [],
    });

    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { menuId } = createCategoryDto;

    await categoriesController.findAllWithProducts(response, menuId);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: [],
      }),
    );
  });

  it('should update a category ', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { id } = createCategoryDto;

    const requestBody = createCategoryDto;
    await categoriesController.update(response, id, requestBody);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: [],
      }),
    );
  });

  it('should remove a category', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { id } = createCategoryDto;

    await categoriesController.remove(response, id);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
  });
});
