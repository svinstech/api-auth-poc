import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APIAuthPOCModule } from './api-auth-poc/api-auth-poc.module';
import { AuthModule } from './auth/auth.module';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        APIAuthPOCModule,
        AuthModule,
    ],
})
export class AppModule {}
