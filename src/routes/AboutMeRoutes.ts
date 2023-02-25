import AboutMeController from "../entities/AboutMe/AboutMeController";
import RoutesTemplate from "../templates/RoutesTemplate";

export default class AboutMeRoutes extends RoutesTemplate {

    constructor(){
        super();
        const controller = new AboutMeController();

        this.routes.get("/", controller.read);
        this.routes.post("/", controller.create);
        this.routes.delete("/:uuid", controller.delete);
        this.routes.put("/", controller.update);
        this.routes.patch("/add-project", controller.addProjects);
        this.routes.patch("/add-curiosities", controller.addCuriosities);
        this.routes.patch("/remove-project", controller.removeProjects);
        this.routes.patch("/remove-curiosities", controller.removeCuriosities);
    }
}