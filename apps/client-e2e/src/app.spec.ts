import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiShellFeatureModule } from '@carpool/api/shell';
import { PrismaService } from '@carpool/api/prisma';

const gql = '/graphql';

describe('Client', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const authService = { findAllUsers: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiShellFeatureModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
    await prisma.$connect();
  });

  it('should create a new customer', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation {createCustomer(name: "John Doe", email: "john.doe@example.com", phone: "145677312965", address: "123 Road, Springfied, MO") {address name phone email}}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createCustomer).toEqual({
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '145677312965',
          address: '123 Road, Springfied, MO',
        });
      });
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });
});
