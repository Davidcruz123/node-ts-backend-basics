import { Request } from 'express'; 

export interface User {
    username:string;
    password:string;
    refreshToken?:string;
    roles:Roles
}

export interface UserRequest extends Request {
    user?: string; 
    roles?:number[];
  }

export interface Roles {
    Admin?: 5150,
    Editor?: 1984,
    User?: 2001
}

