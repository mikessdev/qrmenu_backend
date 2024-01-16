import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@modules/app.module';
import { createUserDto, addUser, cleanUser } from './utils/objects/User';
import {
  addMenu,
  cleanMenu,
  createMenuDto,
  updateMenuDto,
} from './utils/objects/Menu';
import { cleanProduct } from './utils/objects/Product';
import * as request from 'supertest';
import { getAccessToken } from './firebaseAuth/accessToken';
import { MenusService } from '@services/menus.service';

describe('Menu (e2e)', () => {
  let menusServiceMock: MenusService;
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MenusService)
      .useValue(menusServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    accessToken = await getAccessToken();
    await addUser(createUserDto);
  });

  afterAll(async () => {
    await cleanUser();
    await cleanMenu();
    await app.close();
  });

  afterEach(async () => {
    await cleanMenu();
  });

  it('/menus (POST): should create a menu', async () => {
    const body = createMenuDto;
    const response = await request(app.getHttpServer())
      .post('/menus')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(201);
  });

  it('/menus (POST): should not create a menu if the body is empty', async () => {
    const body = {};
    const response = await request(app.getHttpServer())
      .post('/menus')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(500);
  });

  it('/menus (POST): should not create a menu if dont have the bearer token', async () => {
    const body = createMenuDto;
    const response = await request(app.getHttpServer())
      .post('/menus')
      .set('Authorization', 'Bearer ')
      .send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/menus (PATCH): should update a menu', async () => {
    await addMenu(createMenuDto);

    const queryParams = '1';

    const response = await request(app.getHttpServer())
      .patch(`/menus/${queryParams}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateMenuDto);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([1]);
  });

  it('/menu (PATCH): should not update a menu if dont have the bearer token', async () => {
    await addMenu(createMenuDto);

    const queryParams = '1';

    const response = await request(app.getHttpServer())
      .patch(`/menus/${queryParams}`)
      .set('Authorization', 'Bearer ')
      .send(updateMenuDto);

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/menus (PATCH): should not update a menu if does not exist', async () => {
    const queryParams = '1';

    const response = await request(app.getHttpServer())
      .patch(`/menus/${queryParams}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateMenuDto);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([0]);
  });

  it('/menus (DEL): should delete a menu', async () => {
    await addMenu(createMenuDto);
    const queryParams = 1;

    const response = await request(app.getHttpServer())
      .del(`/menus/${queryParams}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({});
  });

  it('/menus (DEL): should not delete a menu if dont have the bearer token', async () => {
    await addMenu(createMenuDto);
    const queryParams = 1;

    const response = await request(app.getHttpServer())
      .del(`/menu/${queryParams}`)
      .set('Authorization', 'Bearer ');

    expect(response.statusCode).toEqual(401);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/menus (GET): should find all menu by userId', async () => {
    await addMenu(createMenuDto);
    const { userId } = createMenuDto;

    const response = await request(app.getHttpServer())
      .get(`/menus/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].userId).toEqual(createMenuDto.userId);
    expect(response.body[0].id).toEqual(createMenuDto.id);
  });

  it('/menus (GET): should find menu by url', async () => {
    await addMenu(createMenuDto);
    const { url } = createMenuDto;

    const response = await request(app.getHttpServer())
      .get(`/menus/url/${url}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.url).toEqual(createMenuDto.url);
    expect(response.body.id).toEqual(createMenuDto.id);
  });
});
