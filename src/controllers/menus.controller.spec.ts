import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '@services/categories.service';
import { CreateMenuDto } from '@dtos/create/create-menu.dto';
import { MenusController } from './menus.controller';
import { MenusService } from '@services/menus.service';
import { Response } from 'express';
import { Status } from '@utils/enum/status.enum';
import { HttpStatus } from '@nestjs/common';

const createMenuDto: CreateMenuDto = {
  id: '1',
  userId: '1',
  headerImg: 'http://menu/image',
  profileImg: 'http://profile/image',
  name: 'Restaurante do Japa',
  url: 'restaurante-do-japa',
  phoneNumber: '1199229922',
  primaryColor: '#DD212',
  instagram: '@restaurantedojapa',
  openDays: 'segunda-sexta',
  address: 'brasil-sp',
};

describe('MenusController', () => {
  let menusController: MenusController;
  let menusService: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenusController],
      providers: [
        MenusService,
        {
          provide: MenusService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: createMenuDto,
            }),
            findAllByUserId: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: [createMenuDto],
            }),
            findMenuByURL: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: createMenuDto,
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

    menusController = module.get<MenusController>(MenusController);
    menusService = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(menusController).toBeDefined();
  });

  it('should create a menu with success', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await menusController.create(response, createMenuDto);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: createMenuDto,
      }),
    );
  });

  it('should return all menus by userId', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { userId } = createMenuDto;
    await menusController.findAllByUserId(response, userId);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: [createMenuDto],
      }),
    );
  });

  it('should not return all menus by userId', async () => {
    jest.spyOn(menusService, 'findAllByUserId').mockResolvedValueOnce({
      status: Status.FAILED,
      message: 'Menus not found',
    });

    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { userId } = createMenuDto;
    await menusController.findAllByUserId(response, userId);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.FAILED,
        message: 'Menus not found',
      }),
    );
  });

  it('should return menu by URL', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { url } = createMenuDto;

    await menusController.findMenuByURL(response, url);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: createMenuDto,
      }),
    );
  });

  it('should update a menu', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { id } = createMenuDto;
    const requestBody = createMenuDto;

    await menusController.update(response, id, requestBody);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: [],
      }),
    );
  });

  it('should remove a menu ', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { id } = createMenuDto;

    await menusController.remove(response, id);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
  });
});
