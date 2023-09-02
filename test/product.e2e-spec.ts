// import { INestApplication } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import { Sequelize } from 'sequelize-typescript';
// import { AppModule } from '../src/app.module';
// import { CreateProductDto } from '../src/products/dto/create-product.dto';
// import { Product } from '../src/products/entities/product.entity';
// import { ProductsService } from '../src/products/products.service';
// import * as request from 'supertest';
// import { firebaseAuth } from './firebaseAuth/app.firebase';
// import { signInWithEmailAndPassword } from '@firebase/auth';

// const createProductDto: CreateProductDto = {
//   id: '1',
//   categoryId: '0c8822f5-add0-4a68-abed-afa880df5096',
//   title: 'Iscas de Frango',
//   description: '300g de filézinho empanado',
//   price: 'R$ 15,00',
//   createdAT: new Date(),
//   updateAt: new Date(),
// };

// const addProductsDataBase = async () => {
//   const { categoryId, title, description, price, createdAT, updateAt } =
//     createProductDto;
//   await Product.create({
//     id: '1',
//     categoryId,
//     title,
//     description,
//     price,
//     createdAT,
//     updateAt,
//   });

//   await Product.create({
//     id: '2',
//     categoryId,
//     title,
//     description,
//     price,
//     createdAT,
//     updateAt,
//   });
// };

// const cleanDataBase = async (sequelize) => {
//   const t = await sequelize.transaction();
//   await Product.destroy({ where: {}, transaction: t });
//   await t.commit();
// };

// describe('ProductController (e2e)', () => {
//   let productsServiceMock: ProductsService;
//   let app: INestApplication;
//   let sequelize: Sequelize;
//   let accessToken: string;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     })
//       .overrideProvider(ProductsService)
//       .useValue(productsServiceMock)
//       .compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     sequelize = moduleFixture.get<Sequelize>(Sequelize);
//     await sequelize.transaction(async (transaction) => {
//       await Product.destroy({ where: {}, transaction });
//     });

//     const userLogin = await signInWithEmailAndPassword(
//       firebaseAuth,
//       process.env.USER_EMAIL,
//       process.env.USER_PASSWORD,
//     );

//     accessToken = userLogin.user['accessToken'];
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   afterEach(async () => {
//     await cleanDataBase(sequelize);
//   });

//   it('/products (POST): should not create a product', async () => {
//     const body = {};
//     const response = await request(app.getHttpServer())
//       .post('/products')
//       .set('Authorization', `Bearer ${accessToken}`)
//       .send(body);
//     expect(response.statusCode).toEqual(500);
//   });

//   it('/products (POST): should create a product', async () => {
//     const body = createProductDto;
//     const response = await request(app.getHttpServer())
//       .post('/products')
//       .set('Authorization', `Bearer ${accessToken}`)
//       .send(body);
//     expect(response.statusCode).toEqual(201);
//   });

//   it('/products (PATCH): should update a product', async () => {
//     await addProductsDataBase();

//     const queryParams = 1;
//     const updateUserDto = {
//       id: `${queryParams}`,
//       title: 'Iscas de Frango atualizadas',
//       description: '150g de filézinho empanado',
//       price: 'R$ 15,00',
//       createdAT: new Date(),
//       updateAt: new Date(),
//     };

//     const response = await request(app.getHttpServer())
//       .patch(`/products/${queryParams}`)
//       .set('Authorization', `Bearer ${accessToken}`)
//       .send(updateUserDto);

//     expect(response.statusCode).toEqual(200);
//     expect(response.body).toEqual([1]);
//   });

//   it('/products (PATCH): should no update a product if does not exist', async () => {
//     const queryParams = 1;
//     const updateUserDto = {
//       id: `${queryParams}`,
//       title: 'Iscas de Frango atualizadas',
//       description: '150g de filézinho empanado',
//       price: 'R$ 15,00',
//       createdAT: new Date(),
//       updateAt: new Date(),
//     };

//     const response = await request(app.getHttpServer())
//       .patch(`/products/${queryParams}?id=${queryParams}`)
//       .set('Authorization', `Bearer ${accessToken}`)
//       .send(updateUserDto);

//     expect(response.statusCode).toEqual(200);
//     expect(response.body).toEqual([0]);
//   });

//   it('/products (DEL): should delete a product', async () => {
//     await addProductsDataBase();

//     const queryParams = 1;

//     const response = await request(app.getHttpServer())
//       .del(`/products/${queryParams}?id=${queryParams}`)
//       .set('Authorization', `Bearer ${accessToken}`);

//     expect(response.statusCode).toEqual(200);
//     expect(response.body).toEqual({});
//   });
// });
