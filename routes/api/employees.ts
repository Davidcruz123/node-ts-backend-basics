import express,{Request,Response} from "express";

const data = {
    employees:{}
};
data.employees = require('../../data/employees.json')
const employeesRouter = express.Router();

employeesRouter.route('/')
    .get((_req: Request,res: Response)=> {
        res.json(data.employees);
    })
    .post((req: Request,res: Response)=> {
        res.json({
            "firstName" : req.body.firstname,
            "lastName" : req.body.lastname
        })
    })
    .put ((req: Request,res: Response)=> {

        res.json({
            "firstName" : req.body.firstname,
            "lastName" : req.body.lastname
        })
    })
    .delete( (req: Request,res: Response)=> {
        res.json({"id":req.body.id})
    } )

employeesRouter.route('/:id')
    .get((req: Request,res: Response)=> {
        res.json({"id": req.params.id})
    } )


export default employeesRouter;

// (req: Request,res: Response)=> {

// } 