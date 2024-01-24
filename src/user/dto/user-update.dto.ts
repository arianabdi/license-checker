import {ApiProperty} from '@nestjs/swagger';
import {Gender, Location} from "../user.model";

export class UserUpdateDto {
    @ApiProperty({type: String})
    gender?: Gender;

    @ApiProperty({type: String})
    first_name?: string;

    @ApiProperty({type: String})
    last_name?: string;

    @ApiProperty({type: String})
    email?: string;

    @ApiProperty({type: String})
    picture?: string;

    @ApiProperty({type: String})
    username?: string;

    @ApiProperty({type: String})
    categoryId?: string;

    @ApiProperty({type: String})
    themeId?: string;

    @ApiProperty({type: Location})
    location?: string;


}
