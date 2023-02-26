import UserController from "../entities/User/UserController";
import AuthorizationTokenMiddleware from "../middlewares/AuthorizationTokenMiddleware";
import RoutesTemplate from "../templates/RoutesTemplate";

export default class UserRoutes extends RoutesTemplate {

    constructor(){
        super();
        const controller = new UserController();
        const permitUser = new AuthorizationTokenMiddleware();


        this.routes.get("/",permitUser.permitUserRule(["ADM"]), controller.read);
        this.routes.post("/", controller.create);
        this.routes.delete("/:uuid",permitUser.permitUserRule(["ADM", "DELETE"]),controller.delete);
        this.routes.patch("/:uuid", permitUser.permitUserRule(["UPDATE"]),controller.updateName);
        this.routes.patch("/addRule/:uuid",permitUser.permitUserRule(["ADM","UPDATE"]), controller.addRule);
        this.routes.patch("/deleteRule/:uuid",permitUser.permitUserRule(["ADM","UPDATE"]), controller.deleteRule);
        this.routes.post("/login", controller.login);
    }
}