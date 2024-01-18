import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@services/users.service';
import { CreateUserDto } from '@dtos/create/create-user.dto';
import { UsersRepository } from '@repository/users.repository';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(1),
            update: jest.fn().mockResolvedValue(1),
            create: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
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
    expect(usersService.create({} as CreateUserDto)).resolves.toEqual(1);
  });

  it('should find user by id', () => {
    const id = '1';
    expect(usersService.findOne(id)).resolves.toEqual(1);
  });

  it('should return 1 when a user is updated', () => {
    const id = '1';
    const requestBody = {} as CreateUserDto;
    expect(usersService.update(id, requestBody)).resolves.toEqual(1);
  });

  it('should return 1 when a user is removed', () => {
    const id = '1';
    expect(usersService.remove(id)).resolves.toEqual(1);
  });
});
