import {Module} from '@nestjs/common';
import {NotificationsService} from './notifications.service';
import {EventEmitterModule} from "@nestjs/event-emitter";
import {HttpModule} from "@nestjs/axios";
import {PostsModule} from "../posts/posts.module";
import {CommentsModule} from "../comments/comments.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "../posts/entities/post.entity";
import {Comment} from "../comments/entities/comment.entity";
import {CommonService} from "../common/common.service";
import {PostRestClientRepository} from "../common/repositories/postsrestclient.repository";
import {CommentRestClientRepository} from "../common/repositories/commentsrestclient.repository";

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        HttpModule,
        PostsModule,
        CommentsModule,
        TypeOrmModule.forFeature([Post, Comment])
    ],
    controllers: [],
    providers: [NotificationsService, CommonService, PostRestClientRepository, CommentRestClientRepository]

})
export class NotificationsModule {
}
