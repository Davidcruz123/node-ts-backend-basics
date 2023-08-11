const fsPromises = require('fs').promises;
import path from 'path';
import bcrypt from 'bcrypt';
import { Request,Response } from 'express';
import { User } from '../models';
const usersDb = {
    users: require('../data/users.json')
}


const handleNewUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ "message": "Username and password are required." })
    }
    // check for duplicate in the db
    const duplicate = usersDb.users.find((user: User) => user.username === username)
    if (duplicate) return res.sendStatus(409); // status conflict
    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //store the new user
        const newUser: User = {
            "username": username,
            "password": hashedPassword,
            "roles": { "User": 2001 }
        };
        usersDb.users = [...usersDb.users, newUser]
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'data', 'users.json'),
            JSON.stringify(usersDb.users)
        )
        console.log(usersDb.users);
        res.status(201).json({ "success": `New user ${username} created` }); // status user was created
    } catch (err: any) {
        res.status(500).json({ "message": err.message });
    }
}

export default handleNewUser;