import AboutMeController from "../entities/AboutMe/AboutMeController";
import AuthorizationTokenMiddleware from "../middlewares/AuthorizationTokenMiddleware";
import RoutesTemplate from "../templates/RoutesTemplate";

export default class AboutMeRoutes extends RoutesTemplate {

    constructor(){
        super();
        const controller = new AboutMeController();
        const permitUser = new AuthorizationTokenMiddleware();
        
        this.routes.post("/",permitUser.permitUserRule(["CREATE"]),controller.create);
        this.routes.put("/",permitUser.permitUserRule(["UPDATE"]), controller.update);
        this.routes.delete("/:uuid", permitUser.permitUserRule(["DELETE"]), controller.delete);
        this.routes.patch("/add-project",permitUser.permitUserRule(["UPDATE"]), controller.addProjects);
        this.routes.patch("/add-curiosities",permitUser.permitUserRule(["UPDATE"]), controller.addCuriosities);
        this.routes.patch("/remove-project",permitUser.permitUserRule(["UPDATE"]), controller.removeProjects);
        this.routes.patch("/remove-curiosities",permitUser.permitUserRule(["UPDATE"]), controller.removeCuriosities);
        this.routes.get("/", controller.read);
    }
}