import { Module } from '@nestjs/common';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [PostsModule, CommentsModule],
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService],
})
export class AppModule {}
