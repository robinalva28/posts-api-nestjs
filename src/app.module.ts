import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CommentsController} from './comments/comments.controller';
import {CommentsModule} from './comments/comments.module';
import {CommentsService} from './comments/comments.service';
import {PostsController} from './posts/posts.controller';
import {PostsModule} from './posts/posts.module';
import {PostsService} from './posts/posts.service';
import {HttpModule} from "@nestjs/axios";
import {PostRestClientRepository} from "./common/repositories/postsrestclient.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentRestClientRepository} from "./common/repositories/commentsrestclient.repository";
import {CommonModule} from './common/common.module';
import {CommonService} from "./common/common.service";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {NotificationsModule} from './notifications/notifications.module';

@Module({
    imports: [
        EventEmitterModule.forRoot({global:true}),
        PostsModule,
        HttpModule,
        CommentsModule,
        CommonModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            autoLoadEntities: true,
            synchronize: true,
        }),
        NotificationsModule,
    ],
    controllers: [PostsController, CommentsController],
    providers: [PostsService, CommentsService, CommonService, PostRestClientRepository, CommentRestClientRepository],
})
export class AppModule {
}
