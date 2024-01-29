import {ApiProperty} from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty({type: String, default: ''})
    email: string;

    @ApiProperty({type: String, default: ''})
    password: string;
}
