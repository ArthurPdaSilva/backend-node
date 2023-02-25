import UserController from "../entities/User/UserController";
import RoutesTemplate from "../templates/RoutesTemplate";

export default class UserRoutes extends RoutesTemplate {

    constructor(){
        super();
        const controller = new UserController();

        this.routes.get("/", controller.read);
        this.routes.post("/", controller.create);
        this.routes.delete("/:uuid", controller.delete);
        this.routes.patch("/:uuid", controller.updateName);
        this.routes.patch("/addRule/:uuid", controller.addRule);
        this.routes.patch("/deleteRule/:uuid", controller.deleteRule);
    }
}