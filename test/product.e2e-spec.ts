import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from '../src/app.module';
import { CreateProductDto } from '../src/products/dto/create-product.dto';
import { Product } from '../src/products/entities/product.entity';
import { ProductsService } from '../src/products/products.service';
import * as request from 'supertest';

const createProductDto: CreateProductDto = {
  id: '1',
  title: 'Iscas de Frango',
  description: '300g de filézinho empanado',
  price: 'R$ 15,00',
  createdAT: new Date(),
  updateAt: new Date(),
};

const addProductsDataBase = async () => {
  const { title, description, price, createdAT, updateAt } = createProductDto;
  await Product.create({
    id: '1',
    title,
    description,
    price,
    createdAT,
    updateAt,
  });

  await Product.create({
    id: '2',
    title,
    description,
    price,
    createdAT,
    updateAt,
  });
};

const cleanDataBase = async (sequelize) => {
  const t = await sequelize.transaction();
  await Product.destroy({ where: {}, transaction: t });
  await t.commit();
};

describe('ProductController (e2e)', () => {
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

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await cleanDataBase(sequelize);
  });

  it('/products (POST): should not create a product', async () => {
    const body = {};
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(body);
    expect(response.statusCode).toEqual(500);
  });

  it('/products (POST): should create a product', async () => {
    const body = createProductDto;
    const response = await request(app.getHttpServer())
      .post('/products')
      .send(body);
    expect(response.statusCode).toEqual(201);
  });

  it('/products (GET): should return all products', async () => {
    await addProductsDataBase();

    const response = await request(app.getHttpServer()).get('/products');
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it('/products (GET): should not return anything if I had no products', async () => {
    const response = await request(app.getHttpServer()).get('/products');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('/products (GET): should return a product by id', async () => {
    await addProductsDataBase();

    const { title, description, price } = createProductDto;
    const queryParams = 2;
    const product = { id: `${queryParams}`, title, description, price };

    const response = await request(app.getHttpServer()).get(
      `/products/${queryParams}?id=${queryParams}`,
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body.id).toEqual(product.id);
    expect(response.body.title).toEqual(product.title);
    expect(response.body.description).toEqual(product.description);
    expect(response.body.price).toEqual(product.price);
  });

  it('/products (GET): should not return a product by id if it does not exist', async () => {
    const queryParams = 999;

    await addProductsDataBase();

    const response = await request(app.getHttpServer()).get(
      `/products/${queryParams}?id=${queryParams}`,
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({});
  });

  it('/products (PATCH): should update a product', async () => {
    await addProductsDataBase();

    const queryParams = 1;
    const updateUserDto = {
      id: `${queryParams}`,
      title: 'Iscas de Frango atualizadas',
      description: '150g de filézinho empanado',
      price: 'R$ 15,00',
      createdAT: new Date(),
      updateAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/products/${queryParams}?id=${queryParams}`)
      .send(updateUserDto);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([1]);

    const updatedUser = await request(app.getHttpServer()).get(
      `/products/${queryParams}?id=${queryParams}`,
    );

    expect(updatedUser.body.title).toEqual(updateUserDto.title);
    expect(updatedUser.body.description).toEqual(updateUserDto.description);
  });

  it('/products (PATCH): should no update a product if does not exist', async () => {
    const queryParams = 1;
    const updateUserDto = {
      id: `${queryParams}`,
      title: 'Iscas de Frango atualizadas',
      description: '150g de filézinho empanado',
      price: 'R$ 15,00',
      createdAT: new Date(),
      updateAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/products/${queryParams}?id=${queryParams}`)
      .send(updateUserDto);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([0]);
  });

  it('/products (DEL): should delete a product', async () => {
    await addProductsDataBase();

    const queryParams = 1;

    const response = await request(app.getHttpServer()).del(
      `/products/${queryParams}?id=${queryParams}`,
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({});

    const updatedUser = await request(app.getHttpServer()).get(
      `/products/${queryParams}?id=${queryParams}`,
    );

    expect(updatedUser.statusCode).toEqual(200);
    expect(updatedUser.body).toEqual({});
  });
});
