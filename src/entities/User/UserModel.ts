import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
    _id:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    rules:[{
        type: String,
        require: true,
    }]

});

const UserModel = mongoose.model("User", schema);

export default UserModel;