import express, { Express, json } from "express";
import cors from "cors";

export default class App {
    private app: Express;

    constructor () {
        this.app = express();
        this.configApp();
        this.configRoutes();
    }

    private configApp(): void {
        this.app.use(json());
        this.app.use(cors());
    }

    private configRoutes(): void { 
        const c = "";
    }

    public getApp(): Express {
        return this.app;
    }
} 