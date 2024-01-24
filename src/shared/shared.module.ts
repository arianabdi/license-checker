import {Module} from "@nestjs/common";
import {SharedService} from "./shared.service";
import {SharedController} from "./shared.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../user/user.schema";
import {License, LicenseSchema} from "../license/license.schema";



@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => ({
                // uri: `mongodb://${process.env.DB_MONGODB_HOST}:${process.env.DB_MONGODB_PORT}/${process.env.DB_MONGODB_DBNAME}`,
                uri: process.env.MONGO_DB_URI,
                useUnifiedTopology: true,
                useNewUrlParser: true,
                serverSelectionTimeoutMS: 5000,
                autoIndex: true,
            }),
        }),
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema},
            {name: License.name, schema: LicenseSchema},
        ])
    ],
    controllers: [SharedController],
    providers: [SharedService],
    exports: [
        SharedService,
        MongooseModule,
    ]
})


export class SharedModule {


}
