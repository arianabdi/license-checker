import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./user.schema";
import {AuthService} from "../auth/auth.service";
import {ClientFieldValidationModel, Payload} from "src/shared/shared.model";
import {Gender, UserApiResponse} from "./user.model";
import {ValidatorService} from "../shared/validator/validator.service";
import {SharedService} from "../shared/shared.service";
import {ObjectId} from "mongodb";


@Injectable()
export class UserService {


    constructor(
        @Inject(forwardRef(() => SharedService)) private sharedService: SharedService,
        @InjectModel(User.name) private userSchema: Model<UserDocument>,
        private authService: AuthService
    ) {
    }


    async register(payload: Payload): Promise<any> {
        if (
            (!payload.body.email || payload.body.email.length == 0) ||
            (!payload.body.password || payload.body.password.length == 0)
        )
            throw new HttpException(
                UserApiResponse.PLEASE_FILL_ALL_INPUTS,
                HttpStatus.BAD_REQUEST
            );


        await ValidatorService.validateEmail(payload.body.email);
        await ValidatorService.validatePassword(payload.body.password);


        // Check if email exist
        const checkUserExistOfThisEmail: User = await this.userSchema.findOne({
            email: payload.body.email
        })


        if (checkUserExistOfThisEmail !== null)
            throw new HttpException(
                UserApiResponse.EMAIL_EXISTS,
                HttpStatus.NOT_ACCEPTABLE
            );


        let init: User = await this.createEmptyUser();
        let newUser = (await new this.userSchema({
            ...init,
            ...payload.body,
            password: await AuthService.encryptPasswd(payload.body.password)
        }).save());

        let accessToken = await this.authService.accessTokenGenerator({
            userId: newUser._id.toString(),
            roles: newUser.roles
        })

        return await SharedService.httpResponseHelper({
            res: payload.res,
            data: {accessToken: accessToken},
            message: UserApiResponse.USER_SUCCESSFULLY_REGISTERED
        });

    }

    async login(payload: Payload) {

        await ValidatorService.validateEmail(payload.body.email);
        // await ValidatorService.validatePassword(payload.body.password);

        let userExists = (await this.userSchema.findOne({
            email: payload.body.email,
            password: await AuthService.encryptPasswd(payload.body.password)
        }));

        if (!userExists)
            throw new HttpException(
                UserApiResponse.USER_NOT_FOUND,
                HttpStatus.NOT_ACCEPTABLE
            );

        let accessToken = await this.authService.accessTokenGenerator({
            userId: userExists._id.toString(),
            roles: userExists.roles
        })

        return await SharedService.httpResponseHelper({
            res: payload.res,
            data: {accessToken: accessToken},
            message: UserApiResponse.USER_SUCCESSFULLY_LOGGED_IN
        });

    }

    async createEmptyUser(): Promise<User> {
        return {
            first_name: '',
            last_name: '',
            mobile: '',
            mobile_verified: false,
            mobile_operator: '',
            email_verified: false,
            location: {
                address: '',
                country: '',
                city: ''
            },
            isAlive: true,
            isSuspended: false,
            roles: [],
            wallet: 0,
            gender: Gender.UNKNOWN,
            timezone: '',
            username: '',
            inventory: 0
        }
    }

    async getUserById(payload: Payload) {
        const user = (await this.userSchema.aggregate([
            {
                $match: {
                    userId: payload.params.userId,
                    isAlive: true
                }
            },
            {
                $project: {
                    userId: 1,
                    createdAt: 1,
                    phoneNumber: 1,
                    wallet: 1,
                }
            }
        ]))[0]

        if (!user)
            throw new HttpException(UserApiResponse.NO_USER_FOUND, HttpStatus.NOT_FOUND)

        return {user: user};
    }


    async getAllUsers(payload: Payload) {
        const totalItem = (await this.userSchema.find()).length
        const users = (await this.userSchema.aggregate([
            {$match: {isAlive: true}},
            {$project: {password: 0}},
            {$sort: {"createdAt": -1}}, //newest=-1  oldest=1
            {$skip: (payload.pagination?.limit || 0) * (payload.pagination?.page ? payload.pagination?.page - 1 : 0)}, //
            !payload.pagination?.limit ? {$skip: 0} : {$limit: payload.pagination?.limit},]))

        if (!users)
            throw new HttpException(UserApiResponse.NO_USER_FOUND, HttpStatus.NOT_FOUND)

        return {
            users: users,
            totalItems: totalItem
        };
    }

    async checkUserFields(user: User) {
        // if (!ad.themeId)
        //     throw new HttpException('selecting_a_theme_is_required',HttpStatus.BAD_REQUEST)

        // if( !(await this.themeSchema.findOne({themeId: ad.themeId})))
        //     throw new HttpException('there_is_no_theme_with_this_id',HttpStatus.NOT_FOUND)
    }

    async updateUser(payload: Payload) {
        const user = (await this.userSchema.findOneAndUpdate(
            {
                userId: payload.params.userId,
                isAlive: true
            },
            {...payload.body},
            {
                returnOriginal: false,
                projection: {
                    first_name: 1,
                    last_name: 1,
                    gender: 1,
                    username: 1,
                    email: 1,
                    roles: 1,
                    phoneVerified: 1,
                    phoneOperator: 1,
                    phoneNumber: 1,
                    email_verified: 1,
                    picture: 1,
                    balance: 1,
                    location: 1,
                    categoryId: 1,
                    themeId: 1,
                }
            }
        ))

        if (!user)
            throw new HttpException(UserApiResponse.USER_NOT_FOUND, HttpStatus.NOT_FOUND)

        return user;
    }

    async getSignedInUser(payload: Payload) {
        const user = (await this.userSchema.aggregate([
            {
                $match: {
                    _id: new ObjectId(payload.user.userId)
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    phoneNumber: 1,
                    first_name: 1,
                    last_name: 1,
                    email: 1,
                    roles: 1,
                    createdAt: 1
                }
            }
        ]))[0]


        if (!user)
            throw new HttpException(UserApiResponse.NO_USER_FOUND, HttpStatus.NOT_FOUND)

        return {user};
    }

    async deleteUser(payload: Payload) {
        const user = await this.userSchema.findOneAndUpdate({
            userId: payload.params.userId,
            isAlive: true
        }, {
            isAlive: false
        }, {
            returnOriginal: false,
            projection: {
                userId: 1,
                email: 1
            }
        })

        if (!user)
            throw new HttpException(UserApiResponse.NO_USER_FOUND, HttpStatus.NOT_FOUND)


        return {user: user};
    }

    async updateSignedInUser(payload: Payload) {
        await this.checkUserFields(payload.body);
        const user = (await this.userSchema.findOneAndUpdate(
            {
                userId: payload.user.userId,
                isAlive: true
            },
            {
                ...payload.body
            },
            {
                returnOriginal: false,
                projection: {
                    first_name: 1,
                    last_name: 1,
                    gender: 1,
                    username: 1,
                    picture: 1,
                    email: 1,
                    balance: 1,
                    location: 1,
                    categoryId: 1,
                    themeId: 1,
                }
            }
        ))

        if (!user)
            throw new HttpException(UserApiResponse.USER_NOT_FOUND, HttpStatus.NOT_FOUND)

        console.log('user_2', user);

        return {
            user: user
        };
    }

    async checkEmailAddress(payload: Payload) {
        let data: ClientFieldValidationModel = {
            isValid: true,
            message: "",
            data: {}
        }
        console.log('payload', payload)
        const user = (await this.userSchema.aggregate([
            {
                $match: {
                    username: {$not: {$eq: payload.params.username}},
                    email: payload.params.email
                }
            },
        ]))[0]

        console.log('user', user)

        if (user) {
            data = {isValid: false, message: UserApiResponse.THIS_USERNAME_ALREADY_EXIST, data: {}}
            return {data}
        }


        data = {isValid: true, message: UserApiResponse.YOU_CAN_CHOOSE_THIS_USERNAME, data: {...user}}
        return {data}


    }

    async checkUsername(payload: Payload) {
        let data: ClientFieldValidationModel = {
            isValid: true,
            message: "",
            data: {}
        }

        const user = (await this.userSchema.aggregate([
            {
                $match: {
                    username: payload.params.username
                }
            },
        ]))[0]



        if (user) {
            data = {isValid: false, message: UserApiResponse.THIS_USERNAME_ALREADY_EXIST, data: {}}
            return {data}
        }


        data = {isValid: true, message: UserApiResponse.YOU_CAN_CHOOSE_THIS_USERNAME, data: {...user}}
        return {data}


    }

    async findPayerByUsername(payload: Payload) {

        let data: ClientFieldValidationModel = {
            isValid: true,
            message: "",
            data: {}
        }

        const user = (await this.userSchema.aggregate([
            {
                $match: {
                    username: payload.params.username
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    email: 1,
                }
            }
        ]))[0]

        if (!user) {
            data = {isValid: false, message: UserApiResponse.USER_NOT_FOUND, data: {}}
            return {data}
        }


        data = {isValid: true, message: UserApiResponse.USER_RECEIVED_SUCCESSFULLY, data: {user}}
        return {data}


    }


    async addWalletToAllusers() {
        await this.userSchema.updateMany({}, {$set: {wallet: 0}});
    }
}
