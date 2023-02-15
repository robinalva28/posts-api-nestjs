import {Controller, Get, Param, ParseIntPipe, Query} from '@nestjs/common';
import {ApiParam, ApiQuery, ApiTags} from '@nestjs/swagger/dist';
import {PostsService} from './posts.service';
import {PaginationDto} from "../common/dto/pagination.dto";

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Get('/')
    findAll(@Query() paginationDto :PaginationDto) {
        return this.postsService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id);
    }
}
