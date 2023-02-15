import {Controller, Put} from '@nestjs/common';
import {CommonService} from "./common.service";

@Controller('common')
export class CommonController {
    constructor(private readonly commonService: CommonService) {
    }

    @Put('/populateDB')
    async populateDB() {
        await this.commonService.populateDB();
    }

}
