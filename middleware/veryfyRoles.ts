import { Response,NextFunction } from "express"
import { UserRequest } from "../models"

const verifyRoles = (...allowedRoles:any)=> { // this is to pass as many parameters as needed.. i would use an array
    return (req:UserRequest, res:Response ,next:NextFunction)=> {
        //1:Check for roles
        if (!req?.roles) return res.sendStatus(401); // unauthorized
        const allowedRolesArray = [...allowedRoles];
        console.log(allowedRolesArray);
        console.log(req.roles)

        // const result =req.roles.map(role=> allowedRolesArray.includes(role)).find(val=>val===true);
        //2: check user has at least one of the needed roles
        //2.1: if so request continues, otherwise unathorized

        const hasNeededRole = req.roles.some(role=> allowedRolesArray.includes(role));
        if (!hasNeededRole) return res.sendStatus(401);
        next() 

    }
}

export default verifyRoles;