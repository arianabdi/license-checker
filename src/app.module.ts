import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import {LicenseModule} from "./license/license.module";
import {AppController} from "./app.controller";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        LicenseModule,
        AuthModule,
    ],

    controllers: [AppController],
    providers: [],
    exports: [ConfigModule]
})
export class AppModule {}
