import DatabaseConfig from "./configurations/DatabaseConfig";

class Server {
    public startServer(): void {
        new DatabaseConfig();
    }
}

new Server().startServer()