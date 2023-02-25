import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
        default: v4()
    },
    userUuid: {
        type: String,
        require: true,
        unique: true,
        ref: "User"
    },
    description: {
        type: String,
        require: true,
    },
    academicDescription: {
        type: String,
        require: true,
    },
    projects: [{
        type: String,
        require: true,
    }],
    curiosities: [{
        type: String,
        require: true,
    }],
});

const AboutMeModel = mongoose.model("About", schema);

export default AboutMeModel;