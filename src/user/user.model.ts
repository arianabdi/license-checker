import {ApiProperty} from "@nestjs/swagger";

export class Picture {

    /*"picture": {
        "large": "https://randomuser.me/api/portraits/men/67.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/67.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/67.jpg"
    },*/
    large: string = '';
    medium: string = '';
    thumbnail: string = '';

}


export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    UNKNOWN = ''
}


export class Location {

    @ApiProperty({type: String})
    address?: string;

    @ApiProperty({type: String})
    country?: string;

    @ApiProperty({type: String})
    city?: string;

    @ApiProperty({type: String})
    postcode?: string;

    @ApiProperty({type: String})
    province?: string;
}


export enum UserApiResponse {
    PHONE_NUMBER_IS_REQUIRED = "phone_number_is_required", // 400 BAD_REQUEST
    OTP_CODE_HAS_EXPIRED = "otp_code_has_expired", // 406 NOT_ACCEPTABLE
    EMAIL_EXISTS = "email_exists", // 406 NOT_ACCEPTABLE
    PLEASE_FILL_ALL_INPUTS = "please_fill_all_inputs",  // 400 BAD_REQUEST
    USER_SUCCESSFULLY_LOGGED_IN = "user_successfully_logged_in",  // 200 OK
    USER_SUCCESSFULLY_REGISTERED = "user_successfully_registered",  // 200 OK
    USER_LIST_RECEIVED_SUCCESSFULLY = "user_list_received_successfully",  // 200 OK
    USER_RECEIVED_SUCCESSFULLY = "user_received_successfully",  // 200 OK
    YOU_CAN_CHOOSE_THIS_USERNAME = "you_can_choose_this_username",  // 200 OK
    USER_DELETED_SUCCESSFULLY = "user_deleted_successfully",  // 200 OK
    USER_DATA_SUCCESSFULLY_UPDATED = "user_data_successfully_updated",  // 200 OK
    OTP_CODE_SUCCESSFULLY_GENERATED = "otp_code_successfully_generated",  // 200 OK
    USER_NOT_FOUND = "user_not_found",  // 404 NOT_FOUND
    NO_USER_FOUND = "no_user_found",  // 404 NOT_FOUND
    THIS_EMAIL_ALREADY_EXIST = "this_email_already_exist",  // 406 NOT_ACCEPTABLE
    THIS_USERNAME_ALREADY_EXIST = "This_username_already_exist",  // 406 NOT_ACCEPTABLE
    EMAIL_IS_NOT_VALID = "email_is_not_valid",  // 406 NOT_ACCEPTABLE
    USERNAME_IS_NOT_ACCEPTABLE = "username_must_include_0_9_a_z_dot_and_backslash",  // 406 NOT_ACCEPTABLE
    PASSWORD_IS_TOO_WEAK = "password_is_too_weak_it_must_contains_at_least_8_character_include_a_z_A_Z_number_and_symbols",  // 406 NOT_ACCEPTABLE
}


export const getBuyerUsernameById = {
    from: 'users',
    let: {buyerId: "$buyerId"},
    localField: 'buyerId',
    foreignField: '_id',
    pipeline: [
        {
            $match: {
                $expr: {
                    $and: [
                        {$eq: ["$_id", '$$buyerId']}
                    ]
                }
            }
        },
        {
            $project: {
                _id: 0,
                username: 1,
                email: 1
            }

        }
    ],
    as: 'buyer'
}



