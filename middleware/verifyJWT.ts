import { Response,NextFunction } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {  UserRequest } from '../models';
dotenv.config();

const veryfyJWT = (req:UserRequest,res:Response,next:NextFunction)=> {
    const authHeader = (req.headers.authorization || req.headers.Authorization) as string;
    if (!authHeader?.startsWith('Bearer') ) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err:any,decoded:any) => {      //TODO: find out the right types
            if (err) return res.sendStatus(403); // invalid token
            req.user = decoded.UserInfo.username;  
            req.roles = decoded.UserInfo.roles
            next();
        }
    )
}

export default veryfyJWT;