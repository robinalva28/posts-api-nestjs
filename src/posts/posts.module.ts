import {HttpModule} from '@nestjs/axios';
import {Module} from '@nestjs/common';
import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "./entities/post.entity";
import {Comment} from "../comments/entities/comment.entity";

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Post, Comment])
    ],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [
        TypeOrmModule
    ]
})
export class PostsModule {
}
