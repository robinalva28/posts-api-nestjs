import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PostsController} from './posts/posts.controller';
import {PostsModule} from './posts/posts.module';
import {PostsService} from './posts/posts.service';
import {HttpModule} from "@nestjs/axios";
import {PostRestClientRepository} from "./common/repositories/postsrestclient.repository";
import {EventEmitterModule} from "@nestjs/event-emitter";

@Module({
    imports: [
        EventEmitterModule.forRoot({global: true}),
        PostsModule,
        HttpModule,
        ConfigModule.forRoot(),
        /*TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            autoLoadEntities: true,
            synchronize: true,
        }),*/
    ],
    controllers: [PostsController],
    providers: [PostsService, PostRestClientRepository],
})
export class AppModule {
}
