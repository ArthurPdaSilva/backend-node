import mongoose from "mongoose";
import DotenvComponent from "../components/DotEnvComponent";

export default class DatabaseConfig {

    public static async connect() {
        const urlDatabase = DotenvComponent.API_DATABASE_URL;
        try {
            await mongoose.connect(urlDatabase);
            return;
        } catch (error) {
            throw new Error(error);
        }
    }
}