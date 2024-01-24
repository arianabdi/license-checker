import {Body, Controller, forwardRef, Inject, Post, Req, Res, UseGuards} from "@nestjs/common";

import {ApiTags} from "@nestjs/swagger";

@ApiTags('App')
@Controller('')
export class AppController {
    constructor() {
    }


    // @Get('telegram')
    // async getBotDialog(@Res() res) {
    //     await this.telegrafBot.startTelegramBot();
    //     res.status(HttpStatus.OK).send("Bot service started");
    //     // res.status(HttpStatus.OK).send('bot')
    // }

}
