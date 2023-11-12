import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const cacheManagerMock = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CACHE_MANAGER)
      .useValue(cacheManagerMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  afterEach(() => {
    cacheManagerMock.get.mockReset();
    cacheManagerMock.set.mockReset();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getTopRatedGithubRepos', () => {
    it('should return status code 400 when date is not provided', () => {
      return request(app.getHttpServer())
        .get('/top-rated-github-repos?language=JavaScript&limit=10')
        .expect(400);
    });

    it('should return status code 400 when language is not provided', () => {
      return request(app.getHttpServer())
        .get('/top-rated-github-repos?date=2020-01-01&limit=10')
        .expect(400);
    });

    it('should return status code 400 when limit is not provided', () => {
      return request(app.getHttpServer())
        .get('/top-rated-github-repos?date=2020-01-01&language=JavaScript')
        .expect(400);
    });

    it('should return status code 400 when limit is not a number', () => {
      return request(app.getHttpServer())
        .get(
          '/top-rated-github-repos?date=2020-01-01&language=JavaScript&limit=abc',
        )
        .expect(400);
    });

    it('should return status code 400 when limit is not a positive number', () => {
      return request(app.getHttpServer())
        .get(
          '/top-rated-github-repos?date=2020-01-01&language=JavaScript&limit=-10',
        )
        .expect(400);
    });

    it('should return status code 400 when date is not a valid date', () => {
      return request(app.getHttpServer())
        .get(
          '/top-rated-github-repos?date=2020-01-32&language=JavaScript&limit=10',
        )
        .expect(400);
    });

    it('should return status code 400 when language is not matching enum', () => {
      return request(app.getHttpServer())
        .get('/top-rated-github-repos?date=2020-01-01&language=abc&limit=10')
        .expect(400);
    });

    it('should return status code 200 when all parameters are valid', () => {
      return request(app.getHttpServer())
        .get(
          '/top-rated-github-repos?date=2020-01-01&language=JavaScript&limit=10',
        )
        .expect(200);
    });

    it('should return the required number of items', () => {
      return request(app.getHttpServer())
        .get(
          '/top-rated-github-repos?date=2020-01-01&language=JavaScript&limit=10',
        )
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBe(10);
        });
    });
  });
});
