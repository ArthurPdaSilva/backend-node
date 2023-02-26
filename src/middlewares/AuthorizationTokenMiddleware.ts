import { NextFunction, Request, Response } from "express";
import JWTComponent from "../components/JWTComponent";
import LoggerComponent from "../components/LoggerComponent";
import UserService from "../entities/User/UserService";
import User from "../types/User";

const userService = new UserService();
export default class AuthorizationTokenMiddleware {

    private logger: LoggerComponent;

    constructor(){
        this.logger = new LoggerComponent(AuthorizationTokenMiddleware.name);
    }

    public permitUserRule(rulesAllowed: string[]){


        if(rulesAllowed.length === 0){
            rulesAllowed.push("READ");
            rulesAllowed.push("CREATE");
        }
        const isAllowed = ( rulesUser: string[] ): boolean  =>{

            for (let i = 0; i < rulesAllowed.length; i++) {
                const rule = rulesAllowed[i];
                if(rulesUser.indexOf( rule ) == -1){
                    return false;
                }
            }
           return true;
        };

        return async (request: Request, response:Response, next: NextFunction) => {
            const bearerToken = request.headers["authorization"];
            
            try {
                const token = bearerToken.split("Bearer ")[1];

                const userDecoded: User = await JWTComponent.decodeToken(token);

                const user: User = await userService.findByUuid(userDecoded._id);

                if(token !== undefined && isAllowed(user.rules)){
                    this.logger.info("Authorization. Request authorized. Call the next function");
                    next();
                    return;
                }
                this.logger.warn("Not authorized.");
                return response.status(401).json("Requisição não autorizada");
            } catch (error) {
                this.logger.error("Not authorized.", error.message);
                return response.status(401).json("Requisição não autorizada. Erro: Insira um token válido");
            }
        };
    }
}