import { Request, Response } from "express";
import LoggerComponent from "../../components/LoggerComponent";
import ParamtersValidationComponent from "../../components/ParamtersValidationComponent";
import UserDTO from "../../DTO/UserDTO";
import User from "../../types/User";
import UserService from "./UserService";

const service = new UserService();
const logger = new LoggerComponent("UserController");

export default class UserController {

    public async read(request: Request, response: Response): Promise<Response> {
        try {
            
            const users: User[] = await service.read();
            const result = UserDTO.converter(users);
            logger.info("/user. Get method response successfully", result ? result[0] : result);
            return response.status(200).json(result);
        } catch (error) {
            logger.error("/user. Get method response unsuccessfully", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const user:User = request.body;

            const desirableParameters = ["name","email","password"];
            ParamtersValidationComponent.allParamtersRequired(user, desirableParameters);

            const createdUser:User = await service.create(user);

            const result = new UserDTO(createdUser);
            logger.info("/user. post method response successfully", result);
            return response.status(201).json(result);

        } catch (error) {
            logger.error("/user. post method response unsuccessfully", error.message);
            return response.status(400).json(error.message);  
        }
    }

    public async updateName(request: Request, response: Response): Promise<Response> {
        try {
            const desirableParameters = ["uuid","newName"];
            const { uuid } = request.params;
            const { newName } = request.body;

            ParamtersValidationComponent.allParamtersRequired({"uuid":uuid, "newName": newName}, desirableParameters);

            const result:User = await service.updateName(uuid, newName);

            const dto = new UserDTO(result);

            logger.info("/user. updateName method response successfully", dto);
            return response.status(200).json(dto);
        } catch (error) {
            logger.error("/user. updateName method response unsuccessfully", error.message);
            return response.status(400).json(error.message);
        }
    }

    public async addRule(request: Request, response: Response): Promise<Response> {
        try {
            const desirableParameters = ["uuid","newRule"];
            const { newRule } = request.body;
            const { uuid } = request.params;

            ParamtersValidationComponent.allParamtersRequired({"uuid":uuid, "newRule": newRule}, desirableParameters);

           const result = await service.addRule(uuid, newRule);
           if(result){
            logger.info("/user. AddRule method response successfully", newRule);
            return response.status(200).json("Rule added successfully " + newRule);
           }

           logger.warn("/user. AddRule method response successfully", newRule);
           return response.status(400).json("Rule added unsuccessfully " + newRule);
        } catch (error) {
            logger.warn("/user. AddRule method response successfully", error);
            return response.status(400).json("Rule added unsuccessfully " + error);
        }
    }

    public async deleteRule(request: Request, response: Response): Promise<Response> {
        try {
            const desirableParameters = ["uuid","rule"];
            const { rule } = request.body;
            const { uuid } = request.params;

            ParamtersValidationComponent.allParamtersRequired({"uuid":uuid, "rule": rule}, desirableParameters);

           const result = await service.deleteRule(uuid, rule);
           if(result){
            logger.info("/user. AddRule method response successfully", rule);
            return response.status(200).json("Rule removed  successfully " + rule);
           }

           logger.warn("/user. AddRule method response successfully", rule);
           return response.status(400).json("Rule removed unsuccessfully " + rule);
        } catch (error) {
            logger.warn("/user. AddRule method response successfully", error);
            return response.status(400).json("Rule removed unsuccessfully " + error);
        }
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        try {
            const desirableParameters = ["uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.params, desirableParameters);

            const { uuid } = request.params;
            const result = await service.delete(uuid);
            logger.info("/user. Delete method response successfully", {userUuid: result._id});
            return response.status(200).json("Deletado com sucesso. Uuid: " + uuid);

        } catch (error) {
            logger.error("/user. Delete method response unsuccessfully", error.message);
            return response.status(400).json(error.message);  
        }
    }

    public async login(request: Request, response:Response):Promise<Response> {

        try {
            
            const desirableParameters = ["email", "password"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);

            const { email, password } = request.body;

            const result = await service.login(password, email);
            if(result) {
                logger.info("/user/login. login method response sucessfuly", {email});
                return response.status(202).json(result); 
            }

            logger.warn("/user/login. login method response unsucessfuly", {email});
            return response.status(401).json("Dados incorretos");
        } catch (error) {
            logger.error("/user/login. login method response unsucessfuly", error.message);
            return response.status(400).json(error.message);
        }
    }

}