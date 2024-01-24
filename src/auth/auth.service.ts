import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {User, UserDocument} from "../user/user.schema";
import * as jwt from "jsonwebtoken";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as Crypto from 'crypto'
import {Payload} from "../shared/shared.model";
import {UserApiResponse} from "../user/user.model";
import {LoginDto} from "../user/dto/loginDto";

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) private traderService: UserService,
        @InjectModel(User.name) private userSchema: Model<UserDocument>,
        private jwtService: JwtService,
    ) {
    }

    async validateJwtToken(token) {
        if (!token) {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        }
        const decode = jwt.verify(token, process.env.ACCESS_JWT_SECRET) as any;
        return {
            userId: decode.userId,
            roles: decode.roles
        }
    }


    static async encryptPasswd(passwd: string) {
        return Crypto.pbkdf2Sync(passwd, process.env.PASSWD_SALT,
            1000, 64, `sha512`).toString(`hex`)
    }

    async validateUser(body: LoginDto): Promise<any> {
        const user: User = await this.userSchema.findOne({
            email: body.email,
            password: await AuthService.encryptPasswd(body.password)
        });

        if (!user)
            throw new HttpException(UserApiResponse.USER_NOT_FOUND, HttpStatus.NOT_FOUND)

        return user;
    }

    async accessTokenGenerator(payload: any) {
        console.log('accessTokenGenerator', payload)
        return this.jwtService.sign(payload, {
            expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
            secret: process.env.ACCESS_JWT_SECRET
        });
    }

    async refreshTokenGenerator(payload: any) {
        return this.jwtService.sign(payload, {
            expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
            secret: process.env.REFRESH_JWT_SECRET
        });
    }


}
