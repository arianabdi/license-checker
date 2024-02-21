import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {License, LicenseDocument} from "./license.schema";
import {Payload} from "../shared/shared.model";
import {LicenseApiResponse} from "./license.model";
import * as jschardet from 'jschardet';
import {ObjectId} from "mongodb";
@Injectable()
export class LicenseService {
    constructor(
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @InjectModel(License.name) private licenseSchema: Model<LicenseDocument>,
    ) {
    }


    async createNewLicense(payload: Payload) {


        const body = payload.body;

        const exists = (await this.licenseSchema.findOne({
            isAlive: true,
            accountId: body.accountId
        }))

        console.log('account exists', exists)
        if (exists)
            throw new HttpException(LicenseApiResponse.AN_LICENSE_WITH_THIS_ACCOUNT_ID_ALREADY_EXISTS, HttpStatus.FOUND)


        const license = (await new this.licenseSchema({
            isAlive: true,
            firstname: body.firstname,
            lastname: body.lastname,
            accountId: body.accountId,
            broker: body.broker,
            expirationDate: new Date(body.expirationDate),
        }).save());

        if (!license)
            throw new HttpException(LicenseApiResponse.THERE_IS_A_PROBLEM_WITH_CREATING_NEW_LICENSE, HttpStatus.BAD_REQUEST)

        return license;
    }

    async filterQuery(filter: any){

        let output ={}

        if (filter.firstname) {
            output = {...output, firstname: filter.firstname}
        }

        if (filter.lastname) {
            output = {...output, lastname: filter.lastname}
        }

        if (filter.broker) {
            output = {...output, broker: filter.broker}
        }

        if (filter.accountId) {
            output = {...output, accountId: filter.accountId}
        }

        return output
    }

    async getAllLicense(payload: Payload) {

        console.log('filter', payload.filter);
        let filterParams = await this.filterQuery(payload.filter)

        console.log('filterParams',filterParams)
        const filters = {isAlive: true, ...filterParams}
        console.log('filters',filters)


        const totalItems = (await this.licenseSchema.find(filters)).length;

        const license = (await this.licenseSchema.aggregate([
            {$match: filters},
            {$skip: (payload.pagination?.limit || 0) * (payload.pagination?.page ? payload.pagination?.page - 1 : 0)},
            !payload.pagination?.limit ? {$skip: 0} : {$limit: payload.pagination?.limit},
        ]))

        return {license: license, totalItems: totalItems}
    }

    async getLicenseByAccountId(payload: Payload) {
        const accountId = payload.params.accountId;
        const license = (await this.licenseSchema.findOne({
            isAlive: true,
            accountId: accountId
        }))
        if (!license)
            throw new HttpException(LicenseApiResponse.LICENSE_NOT_FOUND, HttpStatus.NOT_FOUND)

        return license
    }

    async deleteLicenseByAccountId(payload: Payload) {
        const license = await this.licenseSchema.findOneAndUpdate(
            {isAlive: true, accountId: payload.params.accountId},
            {isAlive: false},
            {returnOriginal: false}
        )

        if (!license)
            throw new HttpException(LicenseApiResponse.LICENSE_NOT_FOUND, HttpStatus.NOT_FOUND)

        return license
    }

    async updateLicenseByAccountId(payload: Payload) {
        const body = payload.body
        const license = await this.licenseSchema.findOneAndUpdate(
            {isAlive: true, accountId: payload.params.accountId},
            {
                firstname: body.firstname,
                lastname: body.lastname,
                broker: body.broker,
                expirationDate: new Date(body.expirationDate),
            },
            {returnOriginal: false}
        )

        if (!license)
            throw new HttpException(LicenseApiResponse.LICENSE_NOT_FOUND, HttpStatus.NOT_FOUND)

        return license
    }
    detectEncoding(data: string): string {
        const result = jschardet.detect(data);
        return result.encoding;
    }


    async checkLicense(payload: Payload) {
        console.log('dddd', payload.params.accountId, typeof payload.params.accountId)
        const accountId = payload.params.accountId;



        console.log('detectEncoding', this.detectEncoding(accountId))
        const license = (await this.licenseSchema.findOne({
            isAlive: true,
            accountId: accountId
        }))
        console.log('license', license)
        if (!license)
            throw new HttpException(LicenseApiResponse.LICENSE_NOT_FOUND, HttpStatus.NOT_FOUND)

        // Assuming expirationDate is a property of the license schema
        const licenseDate = new Date(license.expirationDate);
        const currentDate = new Date();

        if (licenseDate && licenseDate < currentDate) {
            // License is expired
            return 'expired';
        } else {
            // License is active
            return 'active';
        }
    }
}
