
import { Request, Response } from 'express';
import { User } from '../models';
import fs from 'fs';
import path from 'path';
const fsPromises = fs.promises;

const usersDb = {
    users: require('../data/users.json')
}

const handleLogout = async (req: Request, res: Response) => {
    //On client, also delete the access token.
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back
    const refreshToken = cookies.jwt;
    // if refreshToken in db
    const foundUser:User|undefined = usersDb.users.find((user: User) => user.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly:true, sameSite: 'none', secure: true});
        return res.sendStatus(204)
    }
    // Delete refreshToken in db
    usersDb.users = usersDb.users.map((user:User)=> {
        if (user.refreshToken == refreshToken) {
            delete user.refreshToken
        }
        return user;
    })

    await fsPromises.writeFile(
        path.join(__dirname,'..','data','users.json'),
        JSON.stringify(usersDb.users)
    );

    res.clearCookie('jwt', {httpOnly:true, sameSite: 'none', secure: true}); // secure true - only serves on https
    res.sendStatus(204);

}

export default handleLogout;