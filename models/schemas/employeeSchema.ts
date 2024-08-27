import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
})

const EmployeesMongooseModel = mongoose.model('Employee',employeeSchema);

export default EmployeesMongooseModel;