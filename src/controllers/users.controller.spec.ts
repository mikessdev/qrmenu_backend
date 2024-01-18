import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '@dtos/create/create-user.dto';
import { UsersController } from '@controllers/users.controller';
import { UsersService } from '@services/users.service';
import { Status } from '@utils/enum/status.enum';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

const createUserDto: CreateUserDto = {
  id: '1',
  name: 'Japa',
  lastName: 'da Silva',
  email: 'japa@gmail.com',
  emailVerified: false,
  phoneNumber: '123',
};

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: createUserDto,
            }),
            findOne: jest.fn().mockResolvedValue({
              status: Status.SUCCESS,
              message: createUserDto,
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

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create a user', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await usersController.create(response, createUserDto);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: createUserDto,
      }),
    );
  });

  it('should return user by id', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { id } = createUserDto;
    await usersController.findOne(response, id);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: createUserDto,
      }),
    );
  });

  it('should update a user', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { id } = createUserDto;
    const requestBody = createUserDto;

    await usersController.update(response, id, requestBody);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(response.send).toHaveBeenCalledWith(
      JSON.stringify({
        status: Status.SUCCESS,
        message: [],
      }),
    );
  });

  it('should remove a user ', async () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const { id } = createUserDto;
    await usersController.remove(response, id);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
  });
});
