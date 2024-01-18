import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@modules/app.module';
import * as request from 'supertest';
import {
  createUserDto,
  addUser,
  cleanUser,
  updateUserDto,
} from './utils/objects/User';
import { getAccessToken } from './firebaseAuth/accessToken';
import { UsersService } from '@services/users.service';

describe('User (e2e)', () => {
  let usersServiceMock: UsersService;
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    accessToken = await getAccessToken();
    console.log(accessToken);
  });

  afterAll(async () => {
    await cleanUser();
    await app.close();
  });

  afterEach(async () => {
    await cleanUser();
  });

  it('/users (POST): should create an user', async () => {
    const body = createUserDto;
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(HttpStatus.CREATED);
  });

  it('/users (POST): should not create an user if the body is empty', async () => {
    const body = {};
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(body);
    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('/users (POST): should not create an user if dont have the bearer token', async () => {
    const body = createUserDto;
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', 'Bearer ')
      .send(body);
    expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/users (PATCH): should update an user', async () => {
    await addUser(createUserDto);

    const queryParams = '1';

    const response = await request(app.getHttpServer())
      .patch(`/users/${queryParams}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateUserDto);

    const deserializing = JSON.parse(response.text);

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(deserializing.message).toEqual([1]);
  });

  it('/users (PATCH): should not update an user if dont have the bearer token', async () => {
    await addUser(createUserDto);

    const queryParams = '1';

    const response = await request(app.getHttpServer())
      .patch(`/users/${queryParams}`)
      .set('Authorization', 'Bearer ')
      .send(updateUserDto);

    expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/users (PATCH): should not update an user if does not exist', async () => {
    const userId = '1';

    const response = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateUserDto);

    const deserializing = JSON.parse(response.text);

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(deserializing.message).toEqual([0]);
  });

  it('/categories (DEL): should delete an user', async () => {
    await addUser(createUserDto);
    const userId = '1';

    const response = await request(app.getHttpServer())
      .del(`/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toEqual(HttpStatus.NO_CONTENT);
  });

  it('/users (DEL): should not delete an user if dont have the bearer token', async () => {
    await addUser(createUserDto);
    const userId = '1';

    const response = await request(app.getHttpServer())
      .del(`/users/${userId}`)
      .set('Authorization', 'Bearer ');

    expect(response.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
    expect(response.body.message).toEqual('Access Denied');
  });

  it('/users (GET): should get an user by id', async () => {
    await addUser(createUserDto);
    const userId = '1';

    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', 'Bearer ');

    const deserializing = JSON.parse(response.text);

    expect(response.statusCode).toEqual(HttpStatus.OK);
    expect(deserializing.message.id).toEqual(createUserDto.id);
  });
});
