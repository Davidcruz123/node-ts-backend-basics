import express from "express";
import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } from "../../controllers/employeesControler";

const data = {
    employees:{}
};
data.employees = require('../../data/employees.json')
const employeesRouter = express.Router();

employeesRouter.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put (updateEmployee)
    .delete(deleteEmployee)

employeesRouter.route('/:id')
    .get(getEmployee)


export default employeesRouter;
