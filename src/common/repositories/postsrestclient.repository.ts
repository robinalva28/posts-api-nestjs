import {Post} from "../../posts/entities/post.entity";
import {catchError, firstValueFrom} from "rxjs";
import {AxiosError} from "axios";
import {HttpService} from "@nestjs/axios/dist";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PostRestClientRepository {
    constructor(public readonly httpService: HttpService) {
    }

    async getAllPostsFromApi(): Promise<Post[]> {
        //This action consumes an external API to get all posts and persists in our own DB
        const {data} = await firstValueFrom(
            this.httpService.get(
                'https://jsonplaceholder.typicode.com/posts',
            ).pipe(
                catchError((error: AxiosError) => {
                    throw new Error(`Error in internal rest client ${error}`);
                }),
            ),
        );
        return data;
    }
}