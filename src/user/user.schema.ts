import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {Gender, Picture, Location} from "./user.model";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../auth/auth.model";


export type UserDocument = User & Document;


@Schema({
    timestamps: true
})
export class User {


    _id?: string;

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    gender?: Gender; //جنسیت

    @Prop({type: mongoose.Schema.Types.String})
    name?: string; // آرین عبدی

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    first_name?: string; // آرین

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    last_name?: string; // عبدی

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    username?: string; // نام کاربری

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    register_channel?: string; // از چه طریق ثبت نام رو انجام داده

    @Prop({type: mongoose.Schema.Types.Mixed})
    picture?: Picture; //عکس پروفایل کاربر

    @Prop({type: mongoose.Schema.Types.Number})
    inventory?: number; //موجودی کلید

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    email?: string;

    @Prop({type: mongoose.Schema.Types.String})
    referral_code?: string;

    @ApiProperty({type: Number})
    @Prop({type: mongoose.Schema.Types.Number})
    balance?: number;

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    password?: string;

    @ApiProperty({type: Boolean})
    @Prop({type: mongoose.Schema.Types.Boolean})
    email_verified?: boolean;

    @ApiProperty({type: Number})
    @Prop({type: mongoose.Schema.Types.Number})
    wallet?: number;

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    mobile?: string;

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    mobile_operator?: string;

    @ApiProperty({type: Boolean})
    @Prop({type: mongoose.Schema.Types.Boolean})
    mobile_verified?: boolean;

    @ApiProperty({type: Array})
    @Prop({type: mongoose.Schema.Types.Array})
    roles?: Role[]; // نقش های مختلف برای دسترسی به بخش های مختلف داشبورد

    @ApiProperty({type: Location})
    @Prop({type: mongoose.Schema.Types.Mixed})
    location?: Location;

    @ApiProperty({type: String})
    @Prop({type: mongoose.Schema.Types.String})
    timezone?: string;

    @Prop({type: mongoose.Schema.Types.Boolean})
    isAlive?: boolean; // در صورتی که کاربر از سیستم حذف بشه این مقدار true میشه

    @Prop({type: mongoose.Schema.Types.Boolean})
    isSuspended?: boolean; // در صورتی که بعد از دو هفته تسویه حساب انجام نشه حساب کاربر suspend میشه

}

export const UserSchema = SchemaFactory.createForClass(User);


