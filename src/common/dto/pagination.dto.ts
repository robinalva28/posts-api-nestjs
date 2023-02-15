import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PaginationDto {

    @ApiProperty({required:false})
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    offset?: number;

    @ApiProperty({required:false})
    @IsOptional()
    @IsPositive()
    @IsInt()
    @Type(() => Number)
    limit?: number;

}