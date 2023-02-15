import {Injectable, Logger} from '@nestjs/common';
import {OnEvent} from "@nestjs/event-emitter";
import {PostEvent} from "../events/post.event";

@Injectable()
export class NotificationsService {


    private readonly logger = new Logger(NotificationsService.name);

    @OnEvent('post.required')
    async postRequired(payLoad: PostEvent) {
        console.log(`Hello from NotificationsService, a new posts${payLoad.name} had been requested...`);
    }

}
