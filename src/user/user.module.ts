import {forwardRef, Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {HttpModule} from "@nestjs/axios";
import {SharedModule} from "../shared/shared.module";
import {AuthModule} from "../auth/auth.module";


@Module({
    imports: [
        HttpModule,
        SharedModule,
        forwardRef(() => AuthModule),

    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {


}
