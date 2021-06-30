import { Test, TestingModule } from '@nestjs/testing';
import { HttpServer, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let httpServer: HttpServer;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        httpServer = app.getHttpServer();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/users (GET)', () => {
        return request(httpServer).get('/users').expect(200).expect('[]');
    });

    it('/users/{user_id} (GET)', () => {
        const user_id = randomStringGenerator();
        return request(httpServer)
            .get(`/users/${user_id}`)
            .expect(404)
            .expect('{"statusCode":404,"message":"Not Found"}');
    });
});
