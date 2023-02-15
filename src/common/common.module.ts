import {Module} from '@nestjs/common';
import {CommonService} from './common.service';
import {PostRestClientRepository} from "./repositories/postsrestclient.repository";
import {CommentRestClientRepository} from "./repositories/commentsrestclient.repository";
import {HttpModule} from "@nestjs/axios";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "../posts/entities/post.entity";
import {Comment} from "../comments/entities/comment.entity";
import {PostsModule} from "../posts/posts.module";
import {CommentsModule} from "../comments/comments.module";
import {EventEmitterModule} from "@nestjs/event-emitter";
import { CommonController } from './common.controller';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        HttpModule,
        PostsModule,
        CommentsModule,
        TypeOrmModule.forFeature([Post, Comment])
    ],
    controllers: [CommonController],
    providers: [CommonService, PostRestClientRepository, CommentRestClientRepository],

})
export class CommonModule {
}
