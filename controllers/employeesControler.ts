import { Request, Response } from "express";
import { Employee } from "../models";
import EmployeesMongooseModel from "../models/schemas/employeeSchema";







const getAllEmployees =async (_req: Request, res: Response) => {
    try  {
        const employees = await EmployeesMongooseModel.find({}).exec(); // TODO: handle errors
        res.json(employees);
    }catch (err:any) {
        return res.status(400).send({ "error": err.message|| err })
    } 

}

const getEmployee = async (req: Request, res: Response) => {

    const currentEmployee = await EmployeesMongooseModel.findOne({_id: req.params.id})
    if (currentEmployee) {
        res.json(currentEmployee);
    } else {
        return res.status(400).send({ "message": `Employee ID ${req.params.id} not found` })
    }
}

const createNewEmployee = async (req: Request, res: Response) => {
    const newEmployee: Employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }

    if (!newEmployee.firstName || !newEmployee.lastName) {
        return res.status(404).json({ 'message': 'First and last names are required' })
    }
    const result = await EmployeesMongooseModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName    });
    if (result.firstName) {
        res.status(201).json({"success":"New employee created "}); // 201 new record
    } else {
        res.sendStatus(400);
    }

}

const updateEmployee = async (req: Request, res: Response) => {
    const currentEmployee = await EmployeesMongooseModel.findOne({_id: req.body.id});
    if (!currentEmployee) {
        return res.status(400).send({ "message": `Employee ID ${req.body.id} not found` })
    } else {
        const result = await EmployeesMongooseModel.updateOne({_id: req.body.id}, { 
            $set: {
                firstName:  req.body.firstName || currentEmployee.firstName,
                lastName: req.body.lastName || currentEmployee.lastName
            }
        }).exec();
        if (result.acknowledged) {
            res.status(200).json({"success":`Employed ID ${req.body.id} successfull updated`}); 
        } else {
            res.sendStatus(400);
        }

    }

}

const deleteEmployee =async (req: Request, res: Response) => {
    const result = await EmployeesMongooseModel.deleteOne({_id: req.body.id}).exec();

    if (result.deletedCount>0) {
        res.json({"success":`Employed ID ${req.body.id} successfull deleted`});
    } else {
        return res.status(400).send({ "message": `Employee ID ${req.body.id} not found` })
    }

}

export { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee }