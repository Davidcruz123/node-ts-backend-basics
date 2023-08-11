import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
const fsPromises = fs.promises;
import * as dotenv from 'dotenv';

dotenv.config();



const usersDb = {
    users: require('../data/users.json')
}

const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ "message": "Username and password are required." })
    const foundUser = usersDb.users.find((user: User) => user.username === username)
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        // create JWT
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '30s' } //  5 to 15 min
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '1d' } 
        );

        // saving refreshToken with currentUser
        usersDb.users = usersDb.users.map((user:User)=>{
            if (user.username == foundUser.username) {
                user.refreshToken = refreshToken;
            }
            return user;
        })
        
        await fsPromises.writeFile(
            path.join(__dirname,'..','data','users.json'),
            JSON.stringify(usersDb.users)
        ) ;
        // now it is not available to js
        res.cookie('jwt',refreshToken, {httpOnly:true, maxAge:24*60*60*1000, sameSite: 'none', secure: true}) // maxAge ms
        res.json({ accessToken }) 
    } else {
        res.sendStatus(401);
    }
}

export default handleLogin;