import express from "express";
import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } from "../../controllers/employeesControler";
import verifyRoles from "../../middleware/veryfyRoles";
import ROLES_LIST from "../../config/roles_list";

const employeesRouter = express.Router();
// if we only wanted one route protected, it can be this way
// employesRoter.route('/').get( veryfyJWT, getAllEmployees  ), it means the middleware before the controller

employeesRouter.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createNewEmployee)
    .put (verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee)

employeesRouter.route('/:id')
    .get(getEmployee)


export default employeesRouter;
