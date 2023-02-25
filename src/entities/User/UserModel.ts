import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
        default: v4()
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    rules: [{
        type: String,
        require: true,
    }],
});

const UserModel = mongoose.model("User", schema);

export default UserModel;