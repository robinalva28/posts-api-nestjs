import {Injectable, Logger} from '@nestjs/common';
import {PaginationDto} from "../common/dto/pagination.dto";
import {PostRestClientRepository} from "../common/repositories/postsrestclient.repository";

@Injectable()
export class PostsService {
    constructor(
        private postResClientRepository: PostRestClientRepository
    ) {
    }

    private readonly logger = new Logger(PostsService.name);


    async findAll(paginationDto: PaginationDto) {

        /*const {offset = 0, limit = 10} = paginationDto;

        const result = await this.postRepository.find({
            take: limit,
            skip: offset
        });

        if(result.length == 0){
            throw new NotFoundException('posts not found')
        }*/
        return this.postResClientRepository.getAllPostsFromApi();
    }

    // async findOne(id: number) {
    //     const result = await this.postRepository.findOneBy({id});
    //
    //     if(result == null){
    //         throw new NotFoundException('posts not found')
    //     }
    //
    //     return result;
    // }

}
