import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';

import UsersMongooseModel from '../models/schemas/userSchema';



const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ "message": "Username and password are required." })
    const foundUser = await UsersMongooseModel.findOne({username}).exec() as User;
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWT
        const accessToken = jwt.sign(
            { "UserInfo": {
                "username": foundUser.username,
                "roles":roles
            } },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '5m' } //  5 to 15 min
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '1d' } 
        );
    
        // saving refreshToken with currentUser
            const result = await UsersMongooseModel.updateOne({username: username},{ // it could be done using .save method, but i guess this one is better to handle errors
                $set: {
                    refreshToken:refreshToken
                }
            } ).exec();
            console.log(result);
        // now it is not available to js
        if (result.modifiedCount>0) {
            res.cookie('jwt',refreshToken, {httpOnly:true, maxAge:24*60*60*1000, sameSite: 'none', secure: true}) // maxAge ms     // testing change
            // delete secure:true to work with some simulators like thunderClient, it is needed to chrome
            res.json({ accessToken }) 
        } else {
            res.sendStatus(400);
        }

    } else {
        res.sendStatus(401);
    }
}

export default handleLogin;