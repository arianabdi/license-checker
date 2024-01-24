import {Pagination} from "./pagination/pagination.model";
import {AuthPayload} from "../auth/auth.model";
import {ApiProperty} from "@nestjs/swagger";


export class Payload {
    user?: AuthPayload;
    body?: any;
    res?: any;
    pagination?: Pagination;
    params?: any; //@Param()
    filter?: any
}

export class httpResponseHelperModel {
    res: any
    data: any;
    message?: string;

}

export class ClientFieldValidationModel {
    isValid: boolean;
    message: string;
    data: any
}

export class sendMailDto {
    @ApiProperty({type: String, default: "newsha_1"})
    username?: string;

    @ApiProperty({type: String, default: "title"})
    title?: string;

    @ApiProperty({type: String, default: "subtitle"})
    subtitle?: string;

    @ApiProperty({
        default: {
            Hostname: "114.61.45.56",
            Port: "50474",
            Username: "mute",
            Password: "passwd",
        }
    })
    accessKey?: string;
}

export enum HttpStatusDescription {
    OK = "OK",
    BAD_REQUEST = "BAD_REQUEST",
    NOT_ACCEPTABLE = "NOT_ACCEPTABLE",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "ACCESS_DENIED",
    NOT_FOUND = "NOT_FOUND",
}
