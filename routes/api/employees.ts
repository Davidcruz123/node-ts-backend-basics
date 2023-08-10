import express from "express";
import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } from "../../controllers/employeesControler";

const employeesRouter = express.Router();
// if we only wanted one route protected, it can be this way
// employesRoter.route('/').get( veryfyJWT, getAllEmployees  ), it means the middleware before the controller

employeesRouter.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put (updateEmployee)
    .delete(deleteEmployee)

employeesRouter.route('/:id')
    .get(getEmployee)


export default employeesRouter;
