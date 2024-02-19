import {
    Body,
    Controller,
    Delete,
    forwardRef,
    Get,
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
    Put,
    Req,
    Res,
    Query,
    UseGuards
} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {HttpService} from "@nestjs/axios";
import {UserService} from "./user.service";
import {AuthService} from "../auth/auth.service";
import {Roles} from "../auth/decorator/role.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Pagination} from "../shared/pagination/pagination.model";
import {PaginationPipe} from "../shared/pagination/pagination.pipe";
import {HttpStatusDescription, Payload} from "../shared/shared.model";
import {Role} from "../auth/auth.model";

import {SharedService} from "../shared/shared.service";
import {UserApiResponse} from "./user.model";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {UserUpdateDto} from "./dto/user-update.dto";
import {User} from "./user.schema";
import {RegisterDto} from "./dto/registerDto";
import {LoginDto} from "./dto/loginDto";


@ApiTags('User')
@Controller('api/user')
export class UserController {

    constructor(
        private readonly axios: HttpService,
        private readonly userService: UserService,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    ) {
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('/register')
    async register(@Req() req, @Res() res, @Body() body: RegisterDto) {
        const payload: Payload = {
            body: body,
            res: res
        };

        try {
            await this.userService.register(payload);
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }


    @Post('/login')
    async login(@Res() res, @Req() req, @Body() body: LoginDto) {
        const payload: Payload = {
            body: body,
            res: res
        };

        try {
            await this.userService.login(payload);
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/check')
    async check(@Res() res, @Req() req, @Body() body: LoginDto) {
        const payload: Payload = {
            body: body,
            user: req.user
        };

        try {
            const data = await this.userService.check(payload);
            await SharedService.httpResponseHelper({
                res: res,
                data: data,
                message: UserApiResponse.USER_RECEIVED_SUCCESSFULLY
            });
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }


    @ApiBearerAuth()
    @Roles(Role.SUPER_ADMIN, Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:id')
    async getUserById(@Req() req, @Res() res, @Param('id') userId: string) {
        const payload: Payload = {
            user: req.user,
            params: {
                userId: userId
            }
        };

        try {
            const user = await this.userService.getUserById(payload);
            await SharedService.httpResponseHelper({
                res: res,
                data: user,
                message: UserApiResponse.USER_RECEIVED_SUCCESSFULLY
            });
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }

    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN, Role.ADMIN)
    @Get('/list')
    async getAllUsers(@Query(new PaginationPipe()) pagination: Pagination, @Query() filter, @Req() req, @Res() res) {
        const payload: Payload = {
            user: req.user,
            pagination: pagination,
            filter: filter
        };

        try {
            const data = await this.userService.getAllUsers(payload);
            await SharedService.httpResponseHelper({
                res: res,
                data: {data},
                message: UserApiResponse.USER_LIST_RECEIVED_SUCCESSFULLY
            });
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('payer/:username')
    async findPayerByUsername(@Req() req, @Res() res, @Param('username') username: string) {
        const payload: Payload = {
            user: req.user,
            params: {
                username: username
            }
        };

        try {
            const data = await this.userService.findPayerByUsername(payload);
            await SharedService.httpResponseHelper({res: res, data: data, message: ''});
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }

    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('')
    async getSignedInUser(@Req() req, @Res() res) {
        const payload: Payload = {
            user: req.user,
        };

        try {
            const user = await this.userService.getSignedInUser(payload);
            await SharedService.httpResponseHelper({
                res: res,
                data: user,
                message: UserApiResponse.USER_RECEIVED_SUCCESSFULLY
            });
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }

    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch('')
    async updateSignedInUser(@Req() req, @Res() res, @Body() body: UserUpdateDto) {
        const payload: Payload = {
            user: req.user,
            body: body
        };

        try {
            const user = await this.userService.updateSignedInUser(payload);
            await SharedService.httpResponseHelper({
                res: res,
                data: user,
                message: UserApiResponse.USER_DATA_SUCCESSFULLY_UPDATED
            });
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }

    }

    @ApiBearerAuth()
    @Roles(Role.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:id')
    async deleteUser(@Req() req, @Res() res, @Param('id') userId: string) {

        const payload: Payload = {
            user: req.user,
            params: {
                userId: userId
            }
        };

        try {
            const user = await this.userService.deleteUser(payload);
            await SharedService.httpResponseHelper({
                res: res,
                data: user,
                message: UserApiResponse.USER_DELETED_SUCCESSFULLY
            });
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }
    }


    @ApiBearerAuth()
    @Roles(Role.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/:id')
    async updateUser(@Req() req, @Res() res, @Query('id') userId: string, @Body() body: User) {
        const payload: Payload = {
            user: req.user,
            body: body,
            params: {
                userId: userId
            }
        };

        try {
            const user = await this.userService.updateUser(payload);
            await SharedService.httpResponseHelper({
                res: res,
                data: user,
                message: UserApiResponse.USER_DATA_SUCCESSFULLY_UPDATED
            });
        } catch (e) {
            await SharedService.errorHelper(res, e);
        }

    }




}


