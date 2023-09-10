import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from '../src/app.module';
import { CreateProductDto } from '../src/products/dto/create-product.dto';
import { Product } from '../src/products/entities/product.entity';
import { ProductsService } from '../src/products/products.service';
import * as request from 'supertest';
import { firebaseAuth } from './firebaseAuth/app.firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Transaction } from 'sequelize';
import { CreateCategoryDto } from '../src/categories/dto/create-category.dto';
import { Category } from '../src/categories/entities/category.entity';

const createProductDto: CreateProductDto = {
  id: '1',
  categoryId: '2',
  title: 'Iscas de Frango',
  description: '300g de filézinho empanado',
  price: 'R$ 15,00',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const createCategoryDto: CreateCategoryDto = {
  id: '2',
  title: 'Iscas de Frango',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const addCategory = async (category: CreateCategoryDto) => {
  await Category.create(category);
};

const addProduct = async (product: CreateProductDto) => {
  await Product.create(product);
};

const cleanProduct = async () => {
  await Product.destroy({ where: {} });
};

const cleanCategory = async () => {
  await Category.destroy({ where: {} });
};

describe('ProductController (e2e)', () => {
  let productsServiceMock: ProductsService;
  let app: INestApplication;
  let sequelize: Sequelize;
  let accessToken: string;

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
    sequelize.transaction(async (transaction) => {
      await Product.destroy({ where: {}, transaction });
    });

    const userLogin = await signInWithEmailAndPassword(
      firebaseAuth,
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
    );

    accessToken = userLogin.user['accessToken'];
  });

  afterAll(async () => {
    await cleanCategory();
    // await app.close();
  });

  afterEach(async () => {
    await cleanProduct();
  });

  it('/products (POST): should not create a product', async () => {
    const body = {};
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(500);
  });

  it('/products (POST): should create a product', async () => {
    await addCategory(createCategoryDto);
    const body = createProductDto;
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(201);
  });

  it('/products (PATCH): should update a product', async () => {
    await addProduct(createProductDto);

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
      .patch(`/products/${queryParams}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateUserDto);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([1]);
  });

  it('/products (PATCH): should no update a product if does not exist', async () => {
    const productId = 1;
    const updateUserDto = {
      id: `${productId}`,
      title: 'Iscas de Frango atualizadas',
      description: '150g de filézinho empanado',
      price: 'R$ 15,00',
      createdAT: new Date(),
      updateAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/products/${productId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateUserDto);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([0]);
  });

  it('/products (DEL): should delete a product', async () => {
    await addProduct(createProductDto);
    const productId = 1;

    const response = await request(app.getHttpServer())
      .del(`/products/${productId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({});
  });
});
