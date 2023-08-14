import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor:Number,
        Admin:Number
    },
    password: {
        type: String,
        required:true
    },
    refreshToken: String
})

const UsersMongooseModel = mongoose.model('User',userSchema);

export default UsersMongooseModel;