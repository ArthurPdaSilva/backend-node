import { Router } from "express";

export default abstract class RoutesTemplate {
    protected routes: Router = Router();

    public getRoutes(): Router {
        return this.routes;
    }
}