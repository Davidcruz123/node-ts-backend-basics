import express from "express";
import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } from "../../controllers/employeesControler";
import verifyRoles from "../../middleware/veryfyRoles";
// import ROLES_LIST from "../../config/roles_list";
import { RoleCode } from "../../models";

const employeesRouter = express.Router();
// if we only wanted one route protected, it can be this way
// employesRoter.route('/').get( veryfyJWT, getAllEmployees  ), it means the middleware before the controller

employeesRouter.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(RoleCode.Admin,RoleCode.Editor),createNewEmployee)
    .put (verifyRoles(RoleCode.Admin,RoleCode.Editor),updateEmployee)
    .delete(verifyRoles(RoleCode.Admin),deleteEmployee)

employeesRouter.route('/:id')
    .get(getEmployee)


export default employeesRouter;
