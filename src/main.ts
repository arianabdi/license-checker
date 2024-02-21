import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as dotenv from 'dotenv';
import {timeout} from 'rxjs/operators';
import {TimeoutInterceptor} from './interceptors/timeout.interceptor';


async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });

    const config = new DocumentBuilder()
        .setTitle('`License Checker`')
        .setDescription('This is an API for checking license')
        .addBearerAuth()
        .setVersion('1.0.0')
        .addTag('')
        .build();


    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(80);
    dotenv.config({
        path: `${__dirname}/.env`
    });
}

bootstrap();
