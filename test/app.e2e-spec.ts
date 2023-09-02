import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { firebaseAuth } from './firebaseAuth/app.firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import * as core from '@actions/core';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const getUser = await signInWithEmailAndPassword(
      firebaseAuth,
      process.env.USER_EMAIL ?? core.getInput('USER_EMAIL'),
      process.env.USER_PASSWORD ?? core.getInput('USER_PASSWORD'),
    );

    accessToken = getUser.user['accessToken'];
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect('Hello World!');
  });
});
