import { Request,Response } from "express";
const data = {
    employees:{}
};
data.employees = require('../model/employees.json')


const getAllEmployees = (_req: Request,res: Response) => {
    res.json(data.employees);
}

const getEmployee = (req: Request,res: Response)=> {
    res.json({"id": req.params.id})
}

const createNewEmployee = (req: Request,res: Response)=> {
    res.json({
        "firstName" : req.body.firstname,
        "lastName" : req.body.lastname
    })
}

const updateEmployee = (req: Request,res: Response)=> {
    res.json({
        "firstName" : req.body.firstname,
        "lastName" : req.body.lastname
    })
}

const deleteEmployee = (req: Request,res: Response)=> {
    res.json({"id":req.body.id})
}

export {getAllEmployees,createNewEmployee,updateEmployee,deleteEmployee,getEmployee}