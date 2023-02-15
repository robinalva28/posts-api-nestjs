import {Module} from '@nestjs/common';
import {CommonService} from './common.service';
import {PostRestClientRepository} from "./repositories/postsrestclient.repository";
import {HttpModule} from "@nestjs/axios";
import {PostsModule} from "../posts/posts.module";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {CommonController} from './common.controller';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        HttpModule,
        PostsModule,
        //   TypeOrmModule.forFeature([Post, Comment])
    ],
    controllers: [CommonController],
    providers: [CommonService, PostRestClientRepository],
    exports: [CommonModule]
})
export class CommonModule {
}
