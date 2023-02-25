/* eslint-disable no-console */
import DatabaseConfig from "./configurations/DatabaseConfig";
import { Express } from "express";
import os from "os";
import DotenvComponent from "./components/DotEnvComponent";
import App from "./configurations/AppConfig";
import LoggerComponent from "./components/LoggerComponent";

class Server {

    private server: Express;

    constructor (){
        const app = new App();
        this.server = app.getApp();
    }
    public startServer():void {
        DatabaseConfig.connect();
        this.server.listen(DotenvComponent.API_PORT,Server.showTheSystemInformation);
    }

    private static showTheSystemInformation():void {
        const arch = os.arch();
        const plataform = os.platform();
        const type = os.type();
        const mem = os.totalmem();
        const cpus = os.cpus();
        const logger = new LoggerComponent(Server.name);

        logger.info(`SERVICE RUNNING ON PORT: ${DotenvComponent.API_PORT}`);
        logger.info(`SO: ${type} ${plataform} ${arch}`);
        logger.info(`RAM: ${Math.floor(mem * (10 ** -9))} GB`);
        logger.info(`CORES: ${cpus.length}`);
        logger.info(`CPU: ${cpus[0].model}`);
    }
}

new Server().startServer();