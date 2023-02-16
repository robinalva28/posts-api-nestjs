import {Controller, Put} from '@nestjs/common';
import {CommonService} from "./common.service";
import {ApiTags} from "@nestjs/swagger/dist";

@ApiTags('Common')
@Controller('common')
export class CommonController {
    constructor(private readonly commonService: CommonService) {
    }

    @Put('/populateDB')
    async populateDB() {
        await this.commonService.populateDB();
    }

}
