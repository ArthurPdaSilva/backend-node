import { Request, Response } from "express";
import LoggerComponent from "../../components/LoggerComponent";
import ParamtersValidationComponent from "../../components/ParamtersValidationComponent";
import AboutMeDTO from "../../DTO/AboutMeDTO";
import AboutMe from "../../types/AboutMe";
import AboutMeService from "./AboutMeService";

const service = new AboutMeService();
const logger = new LoggerComponent("AboutMeController");
export default class AboutMeController{


    public async read(request: Request, response: Response): Promise<Response> {
        try {
        
            const aboutMeList:AboutMe[] = await service.read();
            const result = AboutMeDTO.converter(aboutMeList);

            logger.info("/about-me. get method response sucessfuly", result ? result[0] : result);
            return response.status(200).json(result);   
        } catch (error) {
            logger.error("/about-me. get method response unsucessfuly", error.message );
            return response.status(400).json(error.message);   
        }
    }

    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const desirableParameters = ["userUuid","description","academicDescription"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);
    
            const aboutMe:AboutMe = request.body;
       
            const result = await service.create(aboutMe);

            if(result !== undefined){
                
                const dto = new AboutMeDTO(result);
                logger.info("/about-me. create method response sucessfuly", result);
                return response.status(201).json(dto);
            }

            logger.warn("/about-me. create method response unsucessfuly", result);
            return response.status(400).json(result);

        } catch (error) {
            logger.error("/about-me. create method response unsucessfuly", error.message );
            return response.status(400).json(error.message);   
        }

    }
    public async delete(request: Request, response: Response): Promise<Response> {
        
        try {
            const desirableParameters = ["uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.params, desirableParameters);

            const { uuid } = request.params;
            const result = await service.delete(uuid);
            logger.info("/about-me. Delete method response sucessfuly", result);
            return response.status(200).json("Deletado com sucesso. Uuid: " + uuid);

        } catch (error) {
            logger.error("/about-me. Delete method response unsucessfuly", error.message);
            return response.status(400).json(error.message);  
        }
    }

    public async addProjects(request: Request, response: Response):Promise<Response> {
        try {
            const desirableParameters = ["newProject", "uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);
            
            const { newProject, uuid } = request.body;
            const result = await service.addProject(uuid, newProject);

            if(result){
                logger.info("/about-me. addProjects method response sucessfuly", { result });
                return response.status(200).json("OK");
            }
            logger.warn("/about-me. addProjects method response unsucessfuly", { result });
            return response.status(400).json("/about-me. addProjects method response unsucessfuly");
        } catch (error) {
            logger.error("/about-me. addProjects method response unsucessfuly", error.message);
            return response.status(400).json(error.message);  
        }
    }

    public async addCuriosities(request: Request, response: Response):Promise<Response> {
        try {
            const desirableParameters = ["newCuriosities", "uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);
            
            const { newCuriosities, uuid } = request.body;
            const result = await service.addCuriosities(uuid, newCuriosities);

            if(result){
                logger.info("/about-me. addCuriosities method response sucessfuly", { result });
                return response.status(200).json("OK");
            }
            logger.warn("/about-me. addCuriosities method response unsucessfuly", { result });
            return response.status(400).json("/about-me. addCuriosities method response unsucessfuly");
        } catch (error) {
            logger.error("/about-me. addCuriosities method response unsucessfuly", error.message);
            return response.status(400).json(error.message);  
        }
    }

    public async update(request: Request, response: Response):Promise<Response> {
        try {
            const desirableParameters = ["uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);

            const { academicDescription , description, uuid } = request.body;

            const result = await service.update(academicDescription, description, uuid);

            if(result !== undefined){
                logger.info("/about-me. addCuriosities method response sucessfuly", { result });
                return response.status(200).json(new AboutMeDTO(result));
            }
            logger.warn("/about-me. addCuriosities method response unsucessfuly", { result });
            return response.status(400).json("/about-me. addCuriosities method response unsucessfuly");
        } catch (error) {
            logger.error("/about-me. update method response unsucessfuly", error.message);
            return response.status(400).json(error.message);
        }
    }   
    
    public async removeCuriosities(request: Request, response: Response):Promise<Response> {
        try {
            const desirableParameters = ["curiosities", "uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);
            
            const { curiosities, uuid } = request.body;
            const result = await service.removeCuriosities(uuid, curiosities);

            if(result){
                logger.info("/about-me. removeCuriosities method response sucessfuly", { result });
                return response.status(200).json("OK");
            }
            logger.warn("/about-me. removeCuriosities method response unsucessfuly", { result });
            return response.status(400).json("/about-me. removeCuriosities method response unsucessfuly");
        } catch (error) {
            logger.error("/about-me. removeCuriosities method response unsucessfuly", error.message);
            return response.status(400).json(error.message);  
        }
    }

    public async removeProjects(request: Request, response: Response):Promise<Response> {
        try {
            const desirableParameters = ["project", "uuid"];
            ParamtersValidationComponent.allParamtersRequired(request.body, desirableParameters);
            
            const { project, uuid } = request.body;
            const result = await service.removeProject(uuid, project);

            if(result){
                logger.info("/about-me. removeProjects method response sucessfuly", { result });
                return response.status(200).json("OK");
            }
            logger.warn("/about-me. removeProjects method response unsucessfuly", { result });
            return response.status(400).json("/about-me. removeProjects method response unsucessfuly");
        } catch (error) {
            logger.error("/about-me. removeProjects method response unsucessfuly", error.message);
            return response.status(400).json(error.message);  
        }
    }
}