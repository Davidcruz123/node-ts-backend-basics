import express, {Response} from "express";
import path from 'path';

const data = {
    employees:{}
};
data.employees = require('../../data')
const employeesRouter = express.Router();

employeesRouter.route('/')
    .get((req,res)=> {
        res.json(data.employees);
    })
    .post((req,res)=> {
        res.json({
            "firstName" : req.body.firstName,
            "lastName" : req.body.lastName
        })
    })


export default employeesRouter;