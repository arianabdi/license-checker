import {HttpStatus, Injectable} from "@nestjs/common";
import * as randomstring from 'randomstring'
import {httpResponseHelperModel} from "./shared.model";
import {ObjectId} from "mongodb";
import * as nodemailer from 'nodemailer';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user/user.schema";
import {Model} from "mongoose";


@Injectable()
export class SharedService {
    private transporter: any;

    constructor(
        @InjectModel(User.name) private userSchema: Model<UserDocument>,
    ) {
    }

    async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }


    async genId(len: number) {
        return (await randomstring.generate({
            length: len,
            charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
        }));
    }


    static async calculateRemainingDays(past, now) {
        let date1 = new Date(now).getTime();
        let date2 = new Date(past).getTime();
        return Math.ceil(Math.abs(date1 - date2) / (1000 * 3600 * 24));
    }


    static async httpResponseHelper(response: httpResponseHelperModel) {
        return response.res.status(HttpStatus.OK).json({
            data: response.data,
            statusCode: HttpStatus.OK,
            message: response.message,
            meta: {
                date: new Date(),
                requestId: new ObjectId(),
            }
        })

    }


    static async errorHelper(res, error) {
        return res.status(error.status ? error.status : HttpStatus.BAD_REQUEST).json(
            {
                "statusCode": error.status,
                "message": error.message,
                "meta": {
                    date: new Date(),
                    requestId: new ObjectId(),
                }
            }
        )
    }


    async sendMail(username: string, title: string, message: string) {

        const user = await this.userSchema.findOne(
            {username: username},
            {email: 1}
        )
        console.log('retreivedUser', user);
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sshuttleland@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        try {
            const mailOptions = {
                from: 'sshuttleland@gmail.com',
                to: user.email,
                subject: title,
                html: message,
            };
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent');
        } catch (error) {
            console.error(error);
        }
    }

    static async generateRandomPassword(length: number): Promise<string> {
        const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';

        const characters = `${uppercaseLetters}${lowercaseLetters}${numbers}`;
        let password = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        return password;
    }

}
