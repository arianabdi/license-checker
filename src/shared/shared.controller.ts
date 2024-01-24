import {Body, Controller, forwardRef, Get, Inject, Post, Res} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {SharedService} from "./shared.service";
import {EmailTemplate} from "./email-template/email-template";
import {sendMailDto} from "./shared.model";
import {AuthService} from "../auth/auth.service";


@ApiTags('Shared')
@Controller('api/shared')
export class SharedController {
    constructor(
        private sharedService: SharedService,
    ) {
    }

    @Post('/send-mail')
    async sendMail(@Res() res, @Body() sendMail: sendMailDto) {
        try {
            const message = EmailTemplate(sendMail.title, sendMail.subtitle, sendMail.accessKey);

            await this.sharedService.sendMail(sendMail.username, sendMail.title, message)
            await SharedService.httpResponseHelper({res: res, data: {}, message: "email_successfully_sent"});

        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }
}
