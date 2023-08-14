
import { Request, Response } from 'express';
import UsersMongooseModel from '../models/schemas/userSchema';




const handleLogout = async (req: Request, res: Response) => {
    //On client, also delete the access token.

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back
    const refreshToken = cookies.jwt;

    // if refreshToken in db
    const foundUser =await  UsersMongooseModel.findOne({refreshToken}).exec(); // TODO: what interface has save method?
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly:true, sameSite: 'none', secure: true});
        // delete secure:true to work with some simulators like thunderClient, it is needed to chrome
        return res.sendStatus(204)
    }
    // Delete refreshToken in db

    foundUser.refreshToken ='';
    const result = await foundUser.save()
    console.log(result);
    res.clearCookie('jwt', {httpOnly:true, sameSite: 'none', secure: true}); // secure true - only serves on https
    // delete secure:true to work with some simulators like thunderClient, it is needed to chrome
    res.sendStatus(204);

}

export default handleLogout;

// another method
    // const result = await UsersMongooseModel.updateOne({refreshToken:refreshToken},{
    //     $unset: {
    //         refreshToken: ""
    //     }
    // }).exec();