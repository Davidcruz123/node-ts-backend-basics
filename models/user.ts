import { Request } from 'express'; 
export interface User {
    username:string;
    password:string;
    refreshToken?:string;
}

export interface UserRequest extends Request {
    user?: string; 
  }