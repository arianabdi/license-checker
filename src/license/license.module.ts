import {forwardRef, Module} from "@nestjs/common";
import {LicenseController} from "./license.controller";
import {LicenseService} from "./license.service";
import {UserModule} from "../user/user.module";
import {SharedModule} from "../shared/shared.module";


@Module({
    imports: [
        SharedModule,
        forwardRef(() => UserModule),
    ],
    controllers: [LicenseController],
    providers: [LicenseService],
    exports: [LicenseService]
})

export class LicenseModule {

}
