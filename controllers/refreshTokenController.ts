
import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';

dotenv.config();



const usersDb = {
    users: require('../data/users.json')
}

const handleRefreshToken =  (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser:User|undefined = usersDb.users.find((user: User) => user.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err:any,decoded:any)=> {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accesToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET as string,
                {expiresIn: '30s'}
            )
            res.json({accesToken});
        }
    )


}

export default handleRefreshToken;