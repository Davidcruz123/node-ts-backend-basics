import { Request } from 'express'; 
// import { JwtPayload } from 'jsonwebtoken';
export interface User {
    username:string;
    password:string;
    refreshToken?:string;
    roles:Roles
}

export interface UserRequest extends Request {
    user?: string; 
    roles?:RoleCode[];
  }

export interface Roles {
    Admin?: RoleCode.Admin,
    Editor?: RoleCode.Editor,
    User?: RoleCode.User
}


export enum RoleCode {
    Admin = 5150,
    Editor = 1984,
    User = 2001
}

export interface UserInfo {
    username:string;
    roles: RoleCode[];
}


// export interface DecodedToken extends JwtPayload, UserInfo {}
