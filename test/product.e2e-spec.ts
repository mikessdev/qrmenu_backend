import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@modules/app.module';
import { ProductsService } from '@services/products.service';
import * as request from 'supertest';
import { firebaseAuth } from './firebaseAuth/app.firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { UserCredential } from 'firebase/auth';
import { createUserDto, addUser, cleanUser } from './utils/objects/User';
import { createMenuDto, addMenu, cleanMenu } from './utils/objects/Menu';
import {
  createProductDto,
  addProduct,
  cleanProduct,
} from './utils/objects/Product';
import {
  createCategoryDto,
  addCategory,
  cleanCategory,
} from './utils/objects/Category';

describe('Product (e2e)', () => {
  let productsServiceMock: ProductsService;
  let app: INestApplication;
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

    const userLogin: UserCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
    );

    accessToken = await userLogin.user.getIdToken();
    await addUser(createUserDto);
    await addMenu(createMenuDto);
    await addCategory(createCategoryDto);
  });

  afterAll(async () => {
    await cleanCategory();
    await cleanUser();
    await cleanMenu();
    await app.close();
  });

  afterEach(async () => {
    await cleanProduct();
  });

  it('/products (POST): should create a product', async () => {
    const body = createProductDto;
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(201);
  });

  it('/products (POST): should not create a product if the body is empty', async () => {
    const body = {};
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(500);
  });

  it('/products (POST): should not create a product if dont have the bearer token', async () => {
    const body = createProductDto;
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', 'Bearer ')
      .send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
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

  it('/products (PATCH): should not update a product if dont have the bearer token', async () => {
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
      .set('Authorization', 'Bearer ')
      .send(updateUserDto);

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/products (PATCH): should not update a product if does not exist', async () => {
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

  it('/products (DEL): should not delete a product if dont have the bearer token', async () => {
    await addProduct(createProductDto);
    const productId = 1;

    const response = await request(app.getHttpServer())
      .del(`/products/${productId}`)
      .set('Authorization', 'Bearer ');

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });
});
