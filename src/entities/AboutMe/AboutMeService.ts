import AboutMe from "../../types/AboutMe";
import UserService from "../User/UserService";
import AboutMeRepository from "./AboutMeRepository";

export default class AboutMeService{
    private repository: AboutMeRepository;
    private userService: UserService;

    public constructor() {
        this.repository = new AboutMeRepository();
        this.userService = new UserService();

    }
    public async create(aboutMe: AboutMe): Promise<AboutMe> {

        try {
            const user = await this.userService.findByUuid(aboutMe.userUuid);

            if(user){
                const uuid = await this.repository.create(aboutMe);
            
                aboutMe._id= uuid;
                return uuid ? aboutMe : undefined;
            }
            
            return undefined;
        } catch (error) {
            return undefined;
        }
    }
    public async read(): Promise<AboutMe[]> {
        return await this.repository.read();
    }

    public async delete(uuid: string): Promise<AboutMe> {
        try {
            return await this.repository.delete(uuid);
        } catch (error) {
            return undefined;
        }
    }

    public async addProject(uuid: string, newProject: string): Promise<string>{

        try {
            const aboutMe: AboutMe = await this.repository.findByUuid(uuid);

            const index = aboutMe.projects.indexOf(newProject);

            if(index == -1){
                aboutMe.projects.push(newProject);
                await this.repository.update(aboutMe);
                return "Successfully";
            }
            return "Unsuccessfully";
        } catch (error) {
            return "Unsuccessfully";
        }
    }
    public async addCuriosities(uuid: string, newCuriosities: string): Promise<string>{

        try {
            const aboutMe: AboutMe = await this.repository.findByUuid(uuid);

        
            const index = aboutMe.curiosities.indexOf(newCuriosities);

            if(index == -1){
                aboutMe.curiosities.push(newCuriosities);
                await this.repository.update(aboutMe);
                return "Successfully";
            }
            return "Unsuccessfully";
        } catch (error) {
            return "Unsuccessfully";
        }
    }

    public async removeProject(uuid: string, project: string): Promise<string>{

        try {
            const aboutMe: AboutMe = await this.repository.findByUuid(uuid);

            const index = aboutMe.projects.indexOf(project);

            if(index > -1){
                aboutMe.projects.splice(index, 1);
                await this.repository.update(aboutMe);
                return "Successfully";
            }
            return "Unsuccessfully";
        } catch (error) {
            return "Unsuccessfully";
        }
    }
    public async removeCuriosities(uuid: string, curiosities: string): Promise<string>{

        try {
            const aboutMe: AboutMe = await this.repository.findByUuid(uuid);

            const index = aboutMe.curiosities.indexOf(curiosities);

            if(index > -1){
                aboutMe.curiosities.splice(index, 1);
                await this.repository.update(aboutMe);
                return "Successfully";
            }
            return "Unsuccessfully";
        } catch (error) {
            return "Unsuccessfully";
        }
    }
    public async update(academicDescription: string, description: string, uuid: string): Promise<AboutMe>{
        try {

            const aboutMe:AboutMe = await this.repository.findByUuid(uuid);

            aboutMe.academicDescription = academicDescription === undefined ? aboutMe.academicDescription : academicDescription;
            aboutMe.description = description === undefined ? aboutMe.description : description;

            return await this.repository.update(aboutMe);
        } catch (error) {
            return undefined;
        }
    }
    
    
}