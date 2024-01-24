import {User} from "./user.schema";

export class EditUserDTO extends User {

}


export class RegisterUserDTO {
    username: string;
    password: string;
    email: string;
}
