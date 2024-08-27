import { Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { UserRequest } from '../models';


const veryfyJWT = (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = (req.headers.authorization || req.headers.Authorization) as string;
    if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1]; // Bearer token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: VerifyErrors | null, decoded: any) => {      //TODO: find out the right types
            if (err) return res.status(403).json({ error: "Invalid token" }); // invalid token

            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles
            next();
        }
    )
}

export default veryfyJWT;