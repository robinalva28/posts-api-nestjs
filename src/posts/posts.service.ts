import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import {Post} from "./entities/post.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private postRepository: Repository<Post>
    ) {
    }

    private readonly logger = new Logger(PostsService.name);


    async findAll(paginationDto: PaginationDto) {

        const {offset = 0, limit = 10} = paginationDto;

        const result = await this.postRepository.find({
            take: limit,
            skip: offset
        });

        if(result.length == 0){
            throw new NotFoundException('posts not found')
        }

        return result;
    }

    async findOne(id: number) {
        const result = await this.postRepository.findOneBy({id});

        if(result == null){
            throw new NotFoundException('posts not found')
        }

        return result;
    }

    async findCommentsByPostId(id: number): Promise<Post[]> {

        const result = await this.postRepository.find({
            where: {id},
            relations: ['comments']
        });

        if(result.length == 0){
            throw new NotFoundException('comments not found')
        }

        return result;
    }

}
