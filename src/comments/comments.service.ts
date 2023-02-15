import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "./entities/comment.entity";
import {Repository} from "typeorm";
import {Post} from "../posts/entities/post.entity";

@Injectable()
export class CommentsService {

    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {
    }

    private readonly logger = new Logger(CommentsService.name);

    create(createCommentDto: CreateCommentDto) {
        return 'This action adds a new comment';
    }

    findAll() {
        return `This action returns all comments`;
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    async findByIdPost(postId: number) : Promise<Comment[]> {

        const result = await this.commentRepository.find({
            where: {id: postId},
            relations: ['post']
        });

        if(result == null){
          throw new NotFoundException('comments not found')
        }

        return result;
    }

}
