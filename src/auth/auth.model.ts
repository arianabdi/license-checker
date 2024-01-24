export enum Role {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super-admin'
}

export class AuthPayload {
    userId: string;
    roles: string[];
}
