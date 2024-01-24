import {ApiProperty} from "@nestjs/swagger";

export class Pagination {

    @ApiProperty({type: Number, required: false})
    page?: number;

    @ApiProperty({type: Number, required: false})
    limit?: number; // items per page
}

