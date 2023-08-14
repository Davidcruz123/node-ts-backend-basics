import bcrypt from 'bcrypt';
import { Request,Response } from 'express';
import UsersMongooseModel from '../models/schemas/userSchema';



const handleNewUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ "message": "Username and password are required." })
    }
    // check for duplicate in the db
    const duplicate = await UsersMongooseModel.findOne({username:username}).exec();
    if (duplicate) return res.sendStatus(409); // status conflict
    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create and store the new user
        const result =await UsersMongooseModel.create( {
            "username": username,
            "password": hashedPassword,
        });
        console.log(result);
        res.status(201).json({ "success": `New user ${username} created` }); // status user was created
    } catch (err: any) {
        res.status(500).json({ "message": err.message });
    }
}

export default handleNewUser;