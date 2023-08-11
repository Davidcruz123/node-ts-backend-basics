import { Response,NextFunction } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserRequest } from '../models';
dotenv.config();

const veryfyJWT = (req:UserRequest,res:Response,next:NextFunction)=> {
    // console.log('headers',req.headers)
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);

    // console.log(authHeader);// Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err:any,decoded:any) => {      //TODO: find out the right types
            if (err) return res.sendStatus(403); // invalid token
            req.user = decoded.username;  
            next();
        }
    )
}

export default veryfyJWT;