import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";
import mongoose from "mongoose";


export enum LicenseApiResponse {
    THERE_IS_A_PROBLEM_WITH_CREATING_NEW_LICENSE = "there_is_a_problem_with_creating_new_license",  // 400 BAD_REQUEST
    LICENSE_NOT_FOUND = "license_not_found",  // 404 NOT_FOUND
    AN_LICENSE_WITH_THIS_ACCOUNT_ID_ALREADY_EXISTS = "an_account_with_this_account_id_already_exists",  // 404 NOT_FOUND
    NO_SERVER_FOUND = "no_server_found",  // 404 NOT_FOUND
}


export class CheckDTO {
    @ApiProperty({type: String, default: '0000000000'})
    @Prop({type: mongoose.Schema.Types.String})
    accountId?: string
}
