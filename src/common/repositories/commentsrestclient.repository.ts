import {catchError, firstValueFrom} from "rxjs";
import {AxiosError} from "axios";
import {HttpService} from "@nestjs/axios/dist";
import {Injectable} from "@nestjs/common";
import {CommentRestClientResponse} from "../dto/commentsrestclientresponse.dto";

@Injectable()
export class CommentRestClientRepository {
    constructor(public readonly httpService: HttpService) {
    }

    async getAllCommentsFromApi(): Promise<CommentRestClientResponse[]> {
        //This action consumes an external API to get all comments and persists in our own DB
        const {data} = await firstValueFrom(
            this.httpService.get(
                'https://jsonplaceholder.typicode.com/comments',
            ).pipe(
                catchError((error: AxiosError) => {
                    throw new Error(`Error in internal rest client ${error}`);
                }),
            ),
        );
        return data;
    }
}