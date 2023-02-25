/* eslint-disable no-console */
import DatabaseConfig from "./configurations/DatabaseConfig";
import os from "os";
import DotEnvComponent from "./components/DotEnvComponent";
import App from "./configurations/AppConfig";

class Server {
    private server: any;

    constructor() {
        const app = new App();
        this.server = app.getApp();
    }

    public startServer(): void {
        new DatabaseConfig();
        this.server.listen(DotEnvComponent.API_PORT, Server.showTheSystemInformation);
    }

    // Informações do sistema
    private static showTheSystemInformation(): void {
        const arch = os.arch();
        const plataform = os.platform();
        const type = os.type();
        const mem = os.totalmem();
        const cpus = os.cpus();

        console.log(`SERVICE RUNNING ON PORT: ${DotEnvComponent.API_PORT}`);
        console.log(`SO: ${type} ${plataform} ${arch}`);
        console.log(`RAM: ${Math.floor(mem * (10 ** -9))} GB`);
        console.log(`CORES: ${cpus.length}`);
        console.log(`CPU: ${cpus[0].model}`);
    }
}

new Server().startServer();