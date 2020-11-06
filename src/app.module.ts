import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServiceTemplateModule } from "./service-template/service-template.module";
import { TypeOrmConfigService } from "./service-template/services/type-orm-config.service";

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: !ENV ? '.env' : `.env.${ ENV }`, }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
        ServiceTemplateModule,
    ]
})
export class AppModule {
}
