import {Controller, Get, Param, Put} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger/dist';
import {CommentsService} from './comments.service';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {
    }

    @Get('/')
    findAll() {
        return this.commentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentsService.findOne(+id);
    }

    @Get('/byPostsId/:postId')
    findByPostId(@Param('postId') postId: string){
        return this.commentsService.findByIdPost(+postId);
    }
}
