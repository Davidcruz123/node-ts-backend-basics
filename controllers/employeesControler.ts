import { Request, Response } from "express";
interface Employee {
    id: number;
    firstname: string;
    lastname: string
}
interface Data {
    employees: Employee[];

}

const data: Data = {
    employees: require('../model/employees.json'),
};



const getAllEmployees = (_req: Request, res: Response) => {
    res.json(data.employees);
}

const getEmployee = (req: Request, res: Response) => {
    const id = +req.params.id;
    const currentEmployee = data.employees.find(employee => employee.id == id);
    if (currentEmployee) {
        res.json(currentEmployee);
    } else {
        return res.status(400).send({ "message": `Employee ID ${id} not found` })
    }
}

const createNewEmployee = (req: Request, res: Response) => {
    const newEmployee: Employee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(404).json({ 'message': 'First and last names are required' })
    }
    data.employees = [...data.employees, newEmployee];
    res.status(201).json(data.employees); // 201 new record
}

const updateEmployee = (req: Request, res: Response) => {

    const id = +req.body.id;
    const currentEmployee = data.employees.find(employee => employee.id == id);
    if (!currentEmployee) {
        return res.status(400).send({ "message": `Employee ID ${id} not found` })
    } else {
        data.employees = data.employees.map(employee => {
            if (employee.id == id) {
                employee.firstname = req.body.firstname || employee.firstname;
                employee.lastname = req.body.lastname || employee.lastname;
            }
            return employee;
        })

        res.json(data.employees);
    }


}

const deleteEmployee = (req: Request, res: Response) => {
    const id = +req.body.id;
    const currentEmployee = data.employees.find(employee => employee.id == id);
    if (currentEmployee) {
        data.employees = data.employees.filter(employee => employee.id != id)
        res.json(data.employees);
    } else {
        return res.status(400).send({ "message": `Employee ID ${id} not found` })
    }

}

export { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee }