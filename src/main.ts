import 'dd-trace/init'; // this must be imported first to enable automatic instrumentation
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const options = new DocumentBuilder()
        .setTitle('ServiceTemplate')
        .setDescription('The ServiceTemplate API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // Adding path prefix at the global level.
    app.setGlobalPrefix('api/v1');

    await app.listen(3000);
}

bootstrap();
