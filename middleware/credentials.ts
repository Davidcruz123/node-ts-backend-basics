import { NextFunction, Response, Request } from "express";
import allowedOrigins from "../config/allowedOrigins";

const credentials = (req:Request, res:Response, next:NextFunction) => {
    const origin = req.headers.origin as string;
     if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials','true') // if it is a valid header, add that header for CORS purposes
     }
     next();
}

export default credentials;