import DatabaseConfig from "../src/configurations/DatabaseConfig";
import AboutMeService from "../src/entities/AboutMe/AboutMeService";
import UserService from "../src/entities/User/UserService";
import AboutMe from "../src/types/AboutMe";
import User from "../src/types/User";

describe("should be test the about me service methods", ()=>{

    const user: User = {
        email:"victor.queiroz@academico.ifpb.edu.br2",
        name: "João Victor Lacerda de Queiroz",
        password: "123456"
    };
    const aboutMeService = new AboutMeService();

    let aboutMe:AboutMe;

    beforeAll( async ()=>{
        await DatabaseConfig.connect();
        const userService = new UserService();

        const result = await userService.create(user);
        user._id = result._id;
    });

    afterAll(async () =>{
        const userService = new UserService();
        await userService.delete(user._id);
    });

    test("sould be create a aboutMe", async () => {
        const entity: AboutMe = {
             userUuid: user._id,
             description: "description test",
             academicDescription: "academicDescription test",
             curiosities:["curiosity 1", "curiosity 2"],
             projects:["project 1", "Project 2"]
        };

        const result = await aboutMeService.create(entity);

        aboutMe = result;
        expect(result).not.toBe(undefined);
    });

    test("should be get all", async () => {

        const result = await aboutMeService.read();
        expect(result.length).not.toBe(0);
    });

    test("should be update academic descript and description", async () => {

        const result = await aboutMeService.update("academic description updated", "description updated", aboutMe._id);
        expect(result).not.toBe(undefined);
    });

    test("should be add a new project", async () => {

        const result = await aboutMeService.addProject(aboutMe._id, "project 3");
        expect(result).toBe(true);
    });

    test("should be remove a project 3 ", async () => {

        const result = await aboutMeService.removeProject(aboutMe._id, "project 3");
        expect(result).toBe(true);
    });

    test("should be add a new curiosity", async () => {

        const result = await aboutMeService.addCuriosities(aboutMe._id, "curiosity 3");
        expect(result).toBe(true);
    });

    test("should be remove a curiosity 3 ", async () => {

        const result = await aboutMeService.removeCuriosities(aboutMe._id, "curiosity 3");
        expect(result).toBe(true);
    });

    test("should be delete a about me", async () => {

        const result = await aboutMeService.delete(aboutMe._id);
        expect(result).not.toBe(undefined);
    });
});