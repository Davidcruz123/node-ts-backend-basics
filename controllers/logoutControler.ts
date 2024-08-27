
import { Request, Response } from 'express';
import UsersMongooseModel from '../models/schemas/userSchema';
import { IS_COOKIE_SECURE } from '../const';




const handleLogout = async (req: Request, res: Response) => {
    //On client, also delete the access token.
    //1: Check if jwt
    const cookies = req.cookies;
    // 1.1: if not present, sent 204 status code
    if (!cookies?.jwt) return res.sendStatus(204); // No content to send back
    const refreshToken = cookies.jwt;

    // if refreshToken in db
    // 2: delete refresh token cookie and refresh token from db. 
    const foundUser =await  UsersMongooseModel.findOne({refreshToken}).exec(); // TODO: what interface has save method?
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly:true, sameSite: 'none', secure: IS_COOKIE_SECURE});
        // delete secure:true to work with some simulators like thunderClient, it is needed to chrome      //// i guess it can work using even local dev, not need to set secure:false
        // the same options to create the cookie are needed to deleted
        return res.sendStatus(204) // No content to send back
    }
    // Delete refreshToken in db

    foundUser.refreshToken ='';
    const result = await foundUser.save()
    console.log(result);
    res.clearCookie('jwt', {httpOnly:true, sameSite: 'none', secure: IS_COOKIE_SECURE}); // secure true - only serves on https
    // delete secure:true to work with some simulators like thunderClient, it is needed to chrome
    // 3: send 204 status code, no content to send back
    res.sendStatus(204);

}

export default handleLogout;

// another method
    // const result = await UsersMongooseModel.updateOne({refreshToken:refreshToken},{
    //     $unset: {
    //         refreshToken: ""
    //     }
    // }).exec();