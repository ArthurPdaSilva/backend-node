import AboutMe from "../types/AboutMe";

export default class AboutMeDTO {

    private uuid:string;
    private description:string;
    private userUuid:string;
    private academicDescription:string;
    private projects:string[];
    private curiosities:string[];

    constructor(aboutMe:AboutMe) {
        this.uuid= aboutMe._id;
        this.description = aboutMe.description;
        this.userUuid = aboutMe.userUuid;
        this.academicDescription = aboutMe.academicDescription;
        this.projects = aboutMe.projects;
        this.curiosities = aboutMe.curiosities;
    }

    public static converter(aboutMeList:AboutMe[]): AboutMeDTO[]{
        if(aboutMeList.length != 0){
            return aboutMeList.map((aboutmeItem)=> new AboutMeDTO(aboutmeItem));
        }
        return undefined;
    }
}