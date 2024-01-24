import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {SharedModule} from "../shared/shared.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {LocalStrategy} from "./strategy/local.strategy";
import {RolesGuard} from "./guards/roles.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Module({
    imports: [
        SharedModule,
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.registerAsync(
            {
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => ({
                    secret: process.env.ACCESS_JWT_SECRET,
                    signOptions: {
                        expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
                    },
                })
            }
        )
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RolesGuard,
        JwtAuthGuard
    ],
    exports: [
        AuthService,
    ],
})
export class AuthModule {
}
