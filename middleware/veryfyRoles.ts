import { Response,NextFunction } from "express"
import { UserRequest } from "../models"

const verifyRoles = (...allowedRoles:any)=> {
    return (req:UserRequest, res:Response ,next:NextFunction)=> {
        if (!req?.roles) return res.sendStatus(401);
        const allowedRolesArray = [...allowedRoles];
        console.log(allowedRolesArray);
        console.log(req.roles)

        // const result =req.roles.map(role=> allowedRolesArray.includes(role)).find(val=>val===true);
        const hasNeededRole = req.roles.some(role=> allowedRolesArray.includes(role));
        if (!hasNeededRole) return res.sendStatus(401);
        next() 

    }
}

export default verifyRoles;