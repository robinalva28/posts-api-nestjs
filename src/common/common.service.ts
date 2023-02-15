import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "../comments/entities/comment.entity";
import {DataSource, Repository} from "typeorm";
import {CommentRestClientRepository} from "./repositories/commentsrestclient.repository";
import {PostRestClientRepository} from "./repositories/postsrestclient.repository";
import {Post} from "../posts/entities/post.entity";
import {OnEvent} from "@nestjs/event-emitter";
import {AppStartedEvent} from "../events/app-started.event";

@Injectable()
export class CommonService {
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>,
                @InjectRepository(Post) private postRepository: Repository<Post>,
                private readonly commentsApiRestClient: CommentRestClientRepository,
                private readonly postsApiRestClient: PostRestClientRepository,
                private dataSource: DataSource) {
    }

    private readonly logger = new Logger(CommonService.name);

    @OnEvent('nestApp.started')
    async populateDB() {
        //This action consumes an external API to get all comments and persists in our own DB

        this.logger.log(`Populating comments database...`);

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        try {
            const commentsFromApi = await this.commentsApiRestClient.getAllCommentsFromApi();
            const postsFromApi = await this.postsApiRestClient.getAllPostsFromApi();

            await queryRunner.query('TRUNCATE TABLE post, comment');

            await this.postRepository.insert(postsFromApi);

            const postsPersisted = await this.postRepository.find({});

            const commentsToPersist = [];

            for (let comment of commentsFromApi) {

                const postObtained = postsPersisted.find(post => post.id == comment.postId);

                const commentToPersist = new Comment();
                commentToPersist.post = postObtained;
                commentToPersist.id = comment.id;
                commentToPersist.name = comment.name;
                commentToPersist.body = comment.body;
                commentToPersist.email = comment.email;

                commentsToPersist.push(commentToPersist);
            }

            await this.commentRepository.insert(commentsToPersist);

        } catch (e) {
            this.logger.log(`An error had ocurred during inserting in DB=${e}`);
        }
    }
}
