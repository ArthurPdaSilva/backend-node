import express, { Express, json } from "express";
import cors from "cors";
import UserRoutes from "../routes/UserRoutes";
import AboutMeRoutes from "../routes/AboutMeRoutes";

export default class App {
    private app: Express;

    constructor () {
        this.app = express();
        this.configApp();
        this.configRoutes();
    }

    private configApp():void {
        this.app.use( json() );
        this.app.use( cors() );
    }

    private configRoutes(): void {
        const userRoutes = new UserRoutes();
        const aboutMeRoutes = new AboutMeRoutes();

        this.app.use("/user", userRoutes.getRoutes());
        this.app.use("/about-me", aboutMeRoutes.getRoutes());
    }

    public getApp(): Express {
        return this.app;
    }
}