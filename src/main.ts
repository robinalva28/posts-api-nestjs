import {NestFactory} from '@nestjs/core';
import {DocumentBuilder} from '@nestjs/swagger';
import {SwaggerModule} from '@nestjs/swagger/dist';
import {AppModule} from './app.module';
import {Logger} from "@nestjs/common";
import {AppStartedEvent} from "./events/app-started.event";
import {EventEmitter2} from "@nestjs/event-emitter";

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/');

    const config = new DocumentBuilder()
        .setTitle('Posts-Comments')
        .setDescription('The Posts API description')
        .setVersion('1.0')
        .addTag('Posts')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT, () => {

        const eventEmitter = new EventEmitter2();
        const appStartedEvent = new AppStartedEvent();
        eventEmitter.emit('nestApp.started', appStartedEvent);
        appStartedEvent.message = 'this is the init message';

    });
}

bootstrap();
