import {ApiProperty} from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty({type: String, default: 'abdiarian3@gmail.com'})
    email: string;

    @ApiProperty({type: String, default: '126284401475c#X'})
    password: string;
}
