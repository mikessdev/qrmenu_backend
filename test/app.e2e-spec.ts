import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { firebaseAuth } from './firebaseAuth/app.firebase';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { AppModule } from '@modules/app.module';
import { UserCredential } from 'firebase/auth';

describe('App (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const userLogin: UserCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
    );
    accessToken = await userLogin.user.getIdToken();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect('Hello World!');
  });
});
