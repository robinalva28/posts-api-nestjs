import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {HttpModule} from "@nestjs/axios";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "../posts/entities/post.entity";
import {Comment} from "./entities/comment.entity";
import {CommentRestClientRepository} from "../common/repositories/commentsrestclient.repository";

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Post, Comment])
  ],
  controllers: [CommentsController],
  providers: [CommentsService,CommentRestClientRepository]
})
export class CommentsModule {}
