import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

const DEFAULT_DB_PORT = 5432;

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
    ) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get('DATABASE_HOST'),
            port: +(
                this.configService.get<number>('DATABASE_PORT') ||
                DEFAULT_DB_PORT
            ),
            username: this.configService.get('DATABASE_USERNAME'),
            password: this.configService.get('DATABASE_PASSWORD'),
            database: this.configService.get('DATABASE_NAME'),
            entities: [join(__dirname, '../entities/*.entity.{ts,js}')],
            synchronize: this.configService.get('DATABASE_SYNC') === 'true',
            namingStrategy: new SnakeNamingStrategy(),
        };
    }
}
