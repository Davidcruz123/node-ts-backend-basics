import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
})

const EmployeesMongooseModel = mongoose.model('Employee',employeeSchema);

export default EmployeesMongooseModel;