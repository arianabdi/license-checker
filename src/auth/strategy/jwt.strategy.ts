import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";

import * as jwt from "jsonwebtoken";
import {WsException} from "@nestjs/websockets";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "../../user/user.schema";
import {UserService} from "../../user/user.service";
import {AuthPayload} from "../auth.model";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @InjectModel(User.name) private userSchema: Model<UserDocument>,
    ) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_JWT_SECRET,
        })
    }

    async validate(payload: any) {
        return {userId: payload.userId, roles: payload.roles}
    }

    async verify(token: string, isWs: boolean = false): Promise<any> {
        try {
            const payload: AuthPayload = jwt.verify(token, process.env.ACCESS_JWT_SECRET) as any;
            if (!payload) {
                if (isWs) {
                    throw new WsException('Unauthorized access');
                } else {
                    throw new HttpException(
                        'Unauthorized access',
                        HttpStatus.UNAUTHORIZED
                    );
                }
            }

            return payload;
        } catch (err) {
            if (isWs) {
                throw new WsException(err.message);
            } else {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            }
        }
    }
}
