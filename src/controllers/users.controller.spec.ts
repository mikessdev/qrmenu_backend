import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '@dtos/create/create-user.dto';
import { UsersController } from '@controllers/users.controller';
import { UsersService } from '@services/users.service';

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
  let usersServiceMock: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockImplementation((user: CreateUserDto) => {
              return Promise.resolve(user);
            }),
            findOne: jest.fn().mockResolvedValue(createUserDto),
            findMenuByURL: jest.fn().mockResolvedValue(createUserDto),
            update: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersServiceMock = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create a user', () => {
    expect(usersController.create(createUserDto)).resolves.toEqual(
      createUserDto,
    );
  });

  it('should return user by id', () => {
    const { id } = createUserDto;
    expect(usersController.findOne(id)).resolves.toEqual(createUserDto);
  });

  it('should return 1 when a user is updated', () => {
    const { id } = createUserDto;
    const requestBody = createUserDto;
    expect(usersController.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a user is removed', () => {
    const { id } = createUserDto;
    expect(usersController.remove(id)).resolves.toEqual(1);
  });
});
