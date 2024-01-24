import {UserApiResponse} from "./user.model";
import {BasicApiResponse} from "../app.model";


export const UserSuccessfullyLoggedInResponses = {
    examples: {
        [UserApiResponse.USER_SUCCESSFULLY_LOGGED_IN]: {
            value: {
                "message": "user_successfully_logged_in",
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE5ZGIxMGViOTkxM2M4M2MwN2RkNDkiLCJyb2xlcyI6W10sImlhdCI6MTY3OTQxNjA4MCwiZXhwIjoxNjgyMDA4MDgwfQ.JVN_7A7j8NzHHBCygFRSd_KRvJ6juvCXgy8XefTDiFw",
                "statusCode": 200,
                "meta": {
                    "date": "2023-03-21T16:28:00.285Z",
                    "requestId": "6419db10eb9913c83c07dd4b"
                }
            }
        },
    },
}

export const UserSuccessfullyRegisteredResponses = {
    examples: {
        [UserApiResponse.USER_SUCCESSFULLY_REGISTERED]: {
            value: {
                "message": "user_successfully_registered",
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE5ZDdmYjQ4OWQ3N2EwMmQ2ZTVmNWIiLCJyb2xlcyI6W10sImlhdCI6MTY3OTQxNTI5MSwiZXhwIjoxNjgyMDA3MjkxfQ.0NXXN1wwFomaugMwvBmDoIy4o40YBGjUmOLr0y950cY",
                "statusCode": 200,
                "meta": {
                    "date": "2023-03-21T16:14:51.986Z",
                    "requestId": "6419d7fb489d77a02d6e5f5d"
                }
            }
        },
    },
}

export const UserApiBadRequestResponses = {
    examples: {
        [UserApiResponse.PHONE_NUMBER_IS_REQUIRED]: {
            value: {
                "statusCode": 400,
                "message": "phone_number_is_required",
                "meta": {
                    "date": "2023-03-15T12:17:03.657Z",
                    "requestId": "6411b73fbc5a93a66842c59c"
                }
            }
        },
    },
}

export const UserApiNotAcceptableResponses = {
    examples: {
        [UserApiResponse.OTP_CODE_HAS_EXPIRED]: {
            value: {}
        },
    },
}

export const GetAllUsersSuccessResponses = {
    examples: {
        [UserApiResponse.USER_LIST_RECEIVED_SUCCESSFULLY]: {
            value: {
                "statusCode": 200,
                "message": "user_list_received_successfully",
                "data": [
                    {
                        "_id": "63ca88444b3877c0a0ce9f96",
                        "userId": "cdf193f0-3abc-4151-8086-81e92abeeb02",
                        "createdAt": "2023-01-20T12:25:40.550Z",
                        "phoneNumber": "09376688343",
                        "otpCode": 264286,
                        "wallet": 0,
                        "deletedAt": null,
                        "updatedAt": null,
                        "otpExpireTime": 1230
                    },
                    {
                        "_id": "63c7afe0d2a8540d7d097aa7",
                        "userId": "cc00ee4d-89c6-4acc-a96a-0028f4dd17cf",
                        "createdAt": "2023-01-18T08:37:52.459Z",
                        "phoneNumber": "09358508586",
                        "otpCode": 742437,
                        "wallet": 0,
                        "deletedAt": null,
                        "updatedAt": null,
                        "otpExpireTime": 842
                    }
                ],
                "meta": {
                    "date": "2023-03-15T12:22:51.402Z",
                    "requestId": "6411b89bab5f00f7e1d9eee9"
                }
            }
        },
    },
}

export const UnauthorizedUserResponse = {
    examples: {
        [BasicApiResponse.UNAUTHORIZED]: {
            value: {
                "statusCode": 401,
                "message": "Unauthorized"
            }
        },
    },
}

export const NoUserFoundResponse = {
    examples: {
        [UserApiResponse.NO_USER_FOUND]: {
            value: {
                "statusCode": 404,
                "message": "no_user_found",
                "meta": {
                    "date": "2023-03-15T13:12:06.453Z",
                    "requestId": "6411c426167339218307a027"
                }
            }
        },
    },
}

export const UserReceivedSuccessfully = {
    examples: {
        [UserApiResponse.USER_RECEIVED_SUCCESSFULLY]: {
            value: {
                "statusCode": 200,
                "message": "user_received_successfully",
                "data": {
                    "user": {
                        "_id": "6404428ec53c605d5bf3dec6",
                        "userId": "6404428ec53c605d5bf3dec5",
                        "phoneNumber": "09039676136",
                        "wallet": 0,
                        "createdAt": "2023-03-05T07:19:42.750Z"
                    }
                },
                "meta": {
                    "date": "2023-03-15T13:15:23.531Z",
                    "requestId": "6411c4ebf89ad700cc7347ba"
                }
            }
        },
    },
}

export const UserNotFoundResponse = {
    examples: {
        [UserApiResponse.USER_NOT_FOUND]: {
            value: {
                "statusCode": 404,
                "message": "user_not_found",
                "meta": {
                    "date": "2023-03-15T13:12:06.453Z",
                    "requestId": "6411c426167339218307a027"
                }
            }
        },
    },
}

export const AccessDeniedResponse = {
    examples: {
        [BasicApiResponse.ACCESS_DENIED]: {
            value: {
                "statusCode": 403,
                "message": "Forbidden resource",
                "error": "Forbidden"
            }
        },
    },
}

export const UserDeletedSuccessfully = {
    examples: {
        [UserApiResponse.USER_DELETED_SUCCESSFULLY]: {
            value: {
                "statusCode": 200,
                "message": "user_deleted_successfully",
                "data": {
                    "user": {
                        "_id": "6404428ec53c605d5bf3dec6",
                        "userId": "6404428ec53c605d5bf3dec5",
                        "email": "abdiarian2@gmail.com"
                    }
                },
                "meta": {
                    "date": "2023-03-18T09:51:41.747Z",
                    "requestId": "641589ad6ae73a5a0eb995e3"
                }
            }
        },
    },
}

export const SignedInUserDataUpdatedSuccessfully = {
    examples: {
        [UserApiResponse.USER_DATA_SUCCESSFULLY_UPDATED]: {
            value: {
                "statusCode": 200,
                "message": "user_data_successfully_updated",
                "data": {
                    "user": {
                        "_id": "6404428ec53c605d5bf3dec6",
                        "gender": "man",
                        "first_name": "arian",
                        "last_name": "abdi",
                        "username": "",
                        "email": "abdiarian2@gmail.com",
                        "location": {
                            "address": "Tehranpars",
                            "country": "Iran",
                            "city": "Tehran"
                        },
                        "categoryId": "string",
                        "themeId": "string"
                    }
                },
                "meta": {
                    "date": "2023-03-18T09:41:04.599Z",
                    "requestId": "64158730b57f80da6bf4ebf6"
                }
            }
        },
    },
}

export const UserDataUpdatedSuccessfully = {
    examples: {
        [UserApiResponse.USER_DATA_SUCCESSFULLY_UPDATED]: {
            value: {
                "statusCode": 200,
                "message": "user_data_successfully_updated",
                "data": {
                    "_id": "6404428ec53c605d5bf3dec6",
                    "gender": "mam",
                    "first_name": "arman",
                    "last_name": "azarian",
                    "username": "iman.azarian",
                    "email": "iman.azarian@gmail.com",
                    "email_verified": true,
                    "phoneNumber": "09039676136",
                    "phoneOperator": "string",
                    "phoneVerified": true,
                    "roles": [
                        "string"
                    ],
                    "location": {
                        "address": "Tehranpars",
                        "country": "Iran",
                        "city": "Tehran",
                        "postcode": "16658837",
                        "province": "Tehran"
                    },
                    "categoryId": "xxxxxxxxxxxx",
                    "themeId": "gggggggggg",
                    "balance": 12
                },
                "meta": {
                    "date": "2023-03-18T10:23:07.908Z",
                    "requestId": "6415910bad1c8160eb6c3092"
                }
            }
        },
    },
}
