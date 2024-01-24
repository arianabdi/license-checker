import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type LicenseDocument = License & Document;

@Schema({
    timestamps: true
})

export class License {
    _id: string;

    id: string;

    @ApiProperty({type: String, default: "محمد"})
    @Prop({type: mongoose.Schema.Types.String})
    firstname?: string

    @ApiProperty({type: String, default: "ابراهیمی"})
    @Prop({type: mongoose.Schema.Types.String})
    lastname?: string

    @ApiProperty({type: String, default: '0000000000'})
    @Prop({type: mongoose.Schema.Types.String})
    accountId?: string

    @ApiProperty({type: String, default: 'alpari'})
    @Prop({type: mongoose.Schema.Types.String})
    broker?: string

    @ApiProperty({type: String, default: new Date()})
    @Prop({type: mongoose.Schema.Types.Date})
    expirationDate?: any

    // @ApiProperty({type: String, default: new Date()})
    @Prop({type: mongoose.Schema.Types.Boolean})
    isAlive?: boolean


}

export const LicenseSchema = SchemaFactory.createForClass(License);
