import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@services/users.service';
import { CreateUserDto } from '@dtos/create/create-user.dto';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '@database/entities/user.entity';

const createUserDto: CreateUserDto = {
  id: '1',
  name: 'John',
  lastName: 'Doe',
  email: '<EMAIL>',
  emailVerified: true,
  phoneNumber: '123456789',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            create: jest.fn().mockImplementation((user: CreateUserDto) => {
              return Promise.resolve(user);
            }),
            findByPk: jest.fn().mockImplementation(() => {
              return Promise.resolve(createUserDto);
            }),
            update: jest.fn().mockResolvedValue(1),
            destroy: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a user', () => {
    expect(usersService.create(createUserDto)).resolves.toEqual(createUserDto);
  });

  it('should find user by id', () => {
    expect(usersService.findOne('1')).resolves.toEqual(createUserDto);
  });

  it('should return 1 when a user is updated', () => {
    const { id } = createUserDto;
    const requestBody = createUserDto;
    expect(usersService.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a user is removed', () => {
    const { id } = createUserDto;
    expect(usersService.remove(id)).resolves.toEqual(1);
  });
});
