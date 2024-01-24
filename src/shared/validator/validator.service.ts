import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ObjectId} from "mongodb";
import {UserApiResponse} from "../../user/user.model";

@Injectable()
export class ValidatorService {

    static async validateEmail(value) {
        const emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if (!value.match(emailRegex))
            throw new HttpException(UserApiResponse.EMAIL_IS_NOT_VALID, HttpStatus.NOT_ACCEPTABLE)
    }

    static async validateUsername(value) {
        const usernameRegex = /^[0-9a-zA-Z\-]+$/;
        if (!value.match(usernameRegex))
            throw new HttpException(UserApiResponse.USERNAME_IS_NOT_ACCEPTABLE, HttpStatus.NOT_ACCEPTABLE)
    }

    static async validatePassword(value) {
        const passwordRegex = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
        if (!value.match(passwordRegex))
            throw new HttpException(UserApiResponse.PASSWORD_IS_TOO_WEAK, HttpStatus.NOT_ACCEPTABLE)
    }
}
