import bcrypt from 'bcrypt';
import { Request,Response } from 'express';
import { User } from '../models';

const usersDb = {
    users: require('../data/users.json')
}

const handleLogin = async (req:Request, res:Response) => {
    const {username, password} = req.body;
    if (!username || !password ) return res.status(400).json({"message":"Username and password are required."})
    const foundUser = usersDb.users.find((user:User)=> user.username === username)
    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password,foundUser.password);
    if (match){
        // create JWT
        res.json({"success": `User ${username} is logged in!`})
    } else {
        res.sendStatus(401);
    }
}

export default handleLogin;