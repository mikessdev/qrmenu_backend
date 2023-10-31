import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@modules/app.module';
import * as request from 'supertest';
import { firebaseAuth } from './firebaseAuth/app.firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { CreateCategoryDto } from '@dtos/create/create-category.dto';
import { CategoriesService } from '@services/categories.service';
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

    const userLogin: UserCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
    );

    accessToken = await userLogin.user.getIdToken();
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

    const queryParams = 1;
    const updateCategoryDto = {
      id: `${queryParams}`,
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

    const queryParams = 1;
    const updateUserDto = {
      id: `${queryParams}`,
      title: 'Petiscos atualizadas',
      createdAT: new Date(),
      updatedAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/categories/${queryParams}`)
      .set('Authorization', 'Bearer ')
      .send(updateUserDto);

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/categories (PATCH): should not update a categories if does not exist', async () => {
    const categoryId = 1;
    const updateUserDto = {
      id: `${categoryId}`,
      title: 'Petiscos atualizadas',
      createdAT: new Date(),
      updatedAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .patch(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateUserDto);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([0]);
  });

  it('/categories (DEL): should delete a category', async () => {
    await addCategory(createCategoryDto);
    const categoryId = 1;

    const response = await request(app.getHttpServer())
      .del(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({});
  });

  it('/categories (DEL): should not delete a category if dont have the bearer token', async () => {
    await addCategory(createCategoryDto);
    const categoryId = 1;

    const response = await request(app.getHttpServer())
      .del(`/categories/${categoryId}`)
      .set('Authorization', 'Bearer ');

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/categories (GET): should get all categories', async () => {
    const categories: CreateCategoryDto[] = [
      {
        id: '1',
        menuId: '1',
        title: 'Petiscos',
        createdAt: new Date('2023-09-16T18:21:27.454Z'),
        updatedAt: new Date('2023-09-16T18:21:27.454Z'),
      },
      {
        id: '3',
        menuId: '1',
        title: 'Bebidas',
        createdAt: new Date('2023-09-16T18:21:27.454Z'),
        updatedAt: new Date('2023-09-16T18:21:27.454Z'),
      },
      {
        id: '4',
        menuId: '1',
        title: 'Pasteis',
        createdAt: new Date('2023-09-16T18:21:27.454Z'),
        updatedAt: new Date('2023-09-16T18:21:27.454Z'),
      },
    ];

    categories.forEach(async (category) => {
      await addCategory(category);
    });

    const response = await request(app.getHttpServer())
      .get(`/categories`)
      .set('Authorization', `Bearer ${accessToken}`);

    const responseTimestamps = response.body.map((category) => {
      const { id, title, menuId, createdAt } = category;
      return {
        id,
        title,
        menuId,
        createdAt: new Date(createdAt),
        updatedAt: new Date('2023-09-16T18:21:27.454Z'),
      };
    });
    expect(response.statusCode).toEqual(200);
    expect(responseTimestamps).toEqual(categories);
  });

  it('/categories (GET): should get any category if there isnt one', async () => {
    const response = await request(app.getHttpServer())
      .get(`/categories`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('/categories (GET): should get a category by ID containing products', async () => {
    const { id } = createCategoryDto;
    const categoryWithProduct = {
      ...createCategoryDto,
      createdAt: new Date('2023-09-16T18:21:20.454Z'),
      updatedAt: new Date('2023-09-16T18:21:27.454Z'),
      product: [
        {
          ...createProductDto,
          createdAt: new Date('2023-09-16T18:21:20.454Z'),
          updatedAt: new Date('2023-09-16T18:21:27.454Z'),
        },
      ],
    };
    await addCategory(createCategoryDto);
    await addProduct(createProductDto);

    const response = await request(app.getHttpServer())
      .get(`/categories/${id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    const responseTimestamps = {
      ...response.body,
      createdAt: new Date('2023-09-16T18:21:20.454Z'),
      updatedAt: new Date('2023-09-16T18:21:27.454Z'),
      product: [
        {
          ...response.body.product[0],
          createdAt: new Date('2023-09-16T18:21:20.454Z'),
          updatedAt: new Date('2023-09-16T18:21:27.454Z'),
        },
      ],
    };

    expect(response.statusCode).toEqual(200);
    expect(responseTimestamps).toEqual(categoryWithProduct);
  });
});
