import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { RoleCode, User } from '../models';
import jwt from 'jsonwebtoken';

import UsersMongooseModel from '../models/schemas/userSchema';
import { IS_COOKIE_SECURE } from '../const/cookieSecure';



const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    //1: Make sure username and password are both present 
    if (!username || !password) return res.status(400).json({ "message": "Username and password are required." })
    const foundUser = await UsersMongooseModel.findOne({ username }).exec() as User;
    // 2:If user does not exist is not authorized 
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    // 3: Check if passwords matches
    if (match) {
        const roles:RoleCode[] = Object.values(foundUser.roles);
        // 4: create JWT 
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username, // do not save passwords or something that can hurt our security
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '5m' } //  5 to 15 min
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '1d' }
        )
        //5.1: Save Refresh token in db with current user 
        const result = await UsersMongooseModel.updateOne({ username: username }, { // it could be done using .save method, but i guess this one is better to handle errors
            $set: {
                refreshToken: refreshToken
            }
        }).exec();
        console.log("login result",result);
        // now it is not available to js
        if (result.modifiedCount > 0) {
            //5.2 send refresh token to user as cookie 
            res.cookie('jwt', refreshToken, 
                { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'none', secure: IS_COOKIE_SECURE }) // maxAge ms     // testing change
            // delete secure:true to work with some simulators like thunderClient, it is needed to chrome
            // 6 acess token is sent to user. 
            res.json({ accessToken }) //client do not set on local storage, store in memory
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);// Unauthorized
    }
}

export default handleLogin;