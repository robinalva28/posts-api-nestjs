import {HttpModule} from '@nestjs/axios';
import {Module} from '@nestjs/common';
import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {PostRestClientRepository} from "../common/repositories/postsrestclient.repository";

@Module({
    imports: [
        HttpModule,
        //TypeOrmModule.forFeature([Post, Comment])
    ],
    controllers: [PostsController],
    providers: [PostsService, PostRestClientRepository],
    exports: [
        // TypeOrmModule
    ]
})
export class PostsModule {
}
