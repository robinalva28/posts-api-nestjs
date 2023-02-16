import {catchError, firstValueFrom} from "rxjs";
import {AxiosError} from "axios";
import {HttpService} from "@nestjs/axios/dist";
import {Injectable} from "@nestjs/common";
import {CommentRestClientResponse} from "../dto/commentsrestclientresponse.dto";

@Injectable()
export class CommentRestClientRepository {
    constructor(public readonly httpService: HttpService) {
    }

    private commentsApiUrl: string = process.env.COMMENTS_API_URL;

    async getAllCommentsFromApi(): Promise<CommentRestClientResponse[]> {
        //This action consumes an external API to get all comments and persists in our own DB
        const {data} = await firstValueFrom(
            this.httpService.get(
                this.commentsApiUrl,
            ).pipe(
                catchError((error: AxiosError) => {
                    throw new Error(`Error in internal rest client ${error}`);
                }),
            ),
        );
        return data;
    }
}