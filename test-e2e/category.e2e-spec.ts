import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@modules/app.module';
import * as request from 'supertest';
import { CategoriesService } from '@services/categories.service';
import { createUserDto, addUser, cleanUser } from './utils/objects/User';
import { createMenuDto, addMenu, cleanMenu } from './utils/objects/Menu';
import { createProductDto, cleanProduct } from './utils/objects/Product';
import {
  createCategoryDto,
  addCategory,
  cleanCategory,
} from './utils/objects/Category';
import { getAccessToken } from './firebaseAuth/accessToken';

describe('Category (e2e)', () => {
  let categoriesServiceMock: CategoriesService;
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CategoriesService)
      .useValue(categoriesServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    accessToken = await getAccessToken();

    await addUser(createUserDto);
    await addMenu(createMenuDto);
  });

  afterAll(async () => {
    await cleanUser();
    await cleanMenu();
    await app.close();
  });

  afterEach(async () => {
    await cleanCategory();
    await cleanProduct();
  });

  it('/categories (POST): should create a category', async () => {
    const body = createCategoryDto;
    const response = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(201);
  });

  it('/categories (POST): should not create a category if the body is empty', async () => {
    const body = {};
    const response = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(500);
  });

  it('/categories (POST): should not create a category if dont have the bearer token', async () => {
    const body = createProductDto;
    const response = await request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', 'Bearer ')
      .send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/categories (PATCH): should update a category', async () => {
    await addCategory(createCategoryDto);

    const queryParams = '1';
    const updateCategoryDto = {
      id: queryParams,
      title: 'Petiscos atualizadas',
      menuId: '1',
      createdAT: new Date(),
      updatedAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/categories/${queryParams}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateCategoryDto);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([1]);
  });

  it('/categories (PATCH): should not update a category if dont have the bearer token', async () => {
    await addCategory(createCategoryDto);

    const queryParams = '1';
    const updateCategoryDto = {
      id: queryParams,
      title: 'Petiscos atualizadas',
      createdAT: new Date(),
      updatedAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/categories/${queryParams}`)
      .set('Authorization', 'Bearer ')
      .send(updateCategoryDto);

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/categories (PATCH): should not update a categories if does not exist', async () => {
    const categoryId = '1';
    const updateCategoryDto = {
      id: categoryId,
      title: 'Petiscos atualizadas',
      createdAT: new Date(),
      updatedAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateCategoryDto);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([0]);
  });

  it('/categories (DEL): should delete a category', async () => {
    await addCategory(createCategoryDto);
    const categoryId = '1';

    const response = await request(app.getHttpServer())
      .del(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({});
  });

  it('/categories (DEL): should not delete a category if dont have the bearer token', async () => {
    await addCategory(createCategoryDto);
    const categoryId = '1';

    const response = await request(app.getHttpServer())
      .del(`/categories/${categoryId}`)
      .set('Authorization', 'Bearer ');

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/categories (GET): should get all categories by menuId', async () => {
    await addCategory(createCategoryDto);
    const { menuId } = createCategoryDto;

    const response = await request(app.getHttpServer()).get(
      `/categories/${menuId}`,
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body[0].id).toEqual(createCategoryDto.id);
  });

  it("/categories (GET): shouldn't get any categories by menu id if they don't exist", async () => {
    const menuId = '1';

    const response = await request(app.getHttpServer()).get(
      `/categories/${menuId}`,
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([]);
  });
});
