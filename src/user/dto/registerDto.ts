import {ApiProperty} from '@nestjs/swagger';

export class RegisterDto {

    @ApiProperty({type: String, default: ''})
    email: string;

    @ApiProperty({type: String, default: ''})
    password: string;

}
