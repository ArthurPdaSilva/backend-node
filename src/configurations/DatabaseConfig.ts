import mongoose from "mongoose";
import DotenvComponent from "../components/DotEnvComponent";
import LoggerComponent from "../components/LoggerComponent";

export default class DatabaseConfig {

    public static async connect() {
        const urlDatabase = DotenvComponent.API_DATABASE_URL;

        const logger = new LoggerComponent(DatabaseConfig.name);
        try {
            await mongoose.connect(urlDatabase);

            logger.info("Database connect successfully");
            return;
        } catch (error) {
            logger.error("Database connect unsuccessfully",error , error.message);
        }
    }
}