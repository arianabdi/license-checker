import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseGuards,} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {License} from "./license.schema";
import { Payload} from "../shared/shared.model";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {SharedService} from "../shared/shared.service";
import {LicenseService} from "./license.service";
import {PaginationPipe} from "../shared/pagination/pagination.pipe";
import {Pagination} from "../shared/pagination/pagination.model";
import {RolesGuard} from "../auth/guards/roles.guard";
import * as rawBody from "raw-body";

@ApiTags('License')
@Controller('api/license')
export class LicenseController {

    constructor(
        private licenseService: LicenseService,
    ) {
    }


    // @ApiBearerAuth()
    @Post('')
    async createNewLicense(@Req() req, @Res() res, @Body() body: License) {
        const payload: Payload = {
            body: body,
            user: req.user,
        };

        try {
            await this.licenseService.createNewLicense(payload);
            await SharedService.httpResponseHelper({res: res, data: {}, message: ''});
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }


    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('/all')
    async getAllLicense(@Query(new PaginationPipe()) pagination: Pagination, @Req() req, @Res() res) {
        const payload: Payload = {
            user: req.user,
            pagination: pagination
        };


        try {
            const data = await this.licenseService.getAllLicense(payload);
            await SharedService.httpResponseHelper({res: res, data: data});
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('/:accountId')
    async getLicenseByAccountId(@Req() req, @Res() res, @Param('accountId') id: string) {
        const payload: Payload = {
            user: req.user,
            params: {
                accountId: id
            }
        };


        try {
            const data = await this.licenseService.getLicenseByAccountId(payload);
            await SharedService.httpResponseHelper({res: res, data: data});
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }


    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Delete('/:accountId')
    async deleteLicenseByAccountId(@Req() req, @Res() res, @Param('accountId') id: string) {
        const payload: Payload = {
            user: req.user,
            params: {
                accountId: id
            }
        };


        try {
            const data = await this.licenseService.deleteLicenseByAccountId(payload);
            await SharedService.httpResponseHelper({res: res, data: data});
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }


    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Put('/:accountId')
    async updateLicenseByAccountId(@Req() req, @Res() res, @Param('accountId') id: string, @Body() body: License) {
        const payload: Payload = {
            user: req.user,
            body: body,
            params: {
                accountId: id
            }
        };


        try {
            const data = await this.licenseService.updateLicenseByAccountId(payload);
            await SharedService.httpResponseHelper({res: res, data: data});
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }



    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Post('/check')
    async checkLicense(@Req() req, @Res() res, @Body() body: any) {
        console.log('body', body);
        let payload: Payload = {
            user: req.user,
            params: {
                accountId: Object.keys(body)[0].replace(/\x00/g, '')
            }
        };


        try {

            const data = await this.licenseService.checkLicense(payload);
            await SharedService.httpResponseHelper({res: res, data: data});
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }

}
