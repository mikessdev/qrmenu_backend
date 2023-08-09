import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Product } from './entities/product.entity';
import { Sequelize } from 'sequelize-typescript';
import { INestApplication } from '@nestjs/common';

const createProductDto: CreateProductDto = {
  id: '1',
  title: 'Iscas de Frango',
  description: '300g de filézinho empanado',
  price: 'R$ 15,00',
  createdAT: new Date(),
  updateAt: new Date(),
};

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsServiceMock: ProductsService;

  const cleanDataForFindAllMethod = (productsServiceMock) => {
    const Empty = [];
    jest.spyOn(productsServiceMock, 'findAll').mockResolvedValue(Empty);
  };

  const cleanDataForFindOneMethod = (productsServiceMock) => {
    const Empty = {};
    jest.spyOn(productsServiceMock, 'findOne').mockResolvedValue(Empty);
  };

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
            findAll: jest
              .fn()
              .mockResolvedValue([createProductDto, createProductDto]),
            findOne: jest.fn().mockResolvedValue(createProductDto),
            update: jest.fn().mockResolvedValue(1),
            remove: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsServiceMock = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  it('should return the created product', () => {
    expect(productsController.create(createProductDto)).resolves.toEqual(
      createProductDto,
    );
  });

  it('should return all of products that were created', () => {
    expect(productsController.findAll()).resolves.toEqual([
      createProductDto,
      createProductDto,
    ]);
  });

  it('should return an empty array if there is no product in database ', () => {
    cleanDataForFindAllMethod(productsServiceMock);
    expect(productsController.findAll()).resolves.toEqual([]);
  });

  it('should return product by Id if it exists', () => {
    expect(productsController.findOne(createProductDto.id)).resolves.toEqual(
      createProductDto,
    );
  });

  it('should not return product by Id if it not exists', () => {
    cleanDataForFindOneMethod(productsServiceMock);
    expect(productsController.findOne(createProductDto.id)).resolves.toEqual(
      {},
    );
  });

  it('should return 1 when a product is updated', () => {
    expect(
      productsController.update(createProductDto.id, createProductDto),
    ).resolves.toEqual(1);
  });

  it('should return 1 when a product is removed', () => {
    expect(productsController.remove(createProductDto.id)).resolves.toEqual(1);
  });
});

describe('HTTP response testing', () => {
  let productsServiceMock: ProductsService;
  let app: INestApplication;
  let sequelize: Sequelize;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProductsService)
      .useValue(productsServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    sequelize = moduleFixture.get<Sequelize>(Sequelize);
    await sequelize.transaction(async (transaction) => {
      await Product.destroy({ where: {}, transaction });
    });
  });

  it('should return code: 500 when there no in the request body', () => {
    const body = {};
    return request(app.getHttpServer())
      .post('/products')
      .send(body)
      .expect(500);
  });

  it('should return code: 201 when there a product in the request body', async () => {
    const body = createProductDto;

    return request(app.getHttpServer())
      .post('/products')
      .send(body)
      .expect(201);
  });
});
