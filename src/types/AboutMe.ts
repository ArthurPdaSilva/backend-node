interface AboutMe {
    _id?:string;
    description:string;
    userUuid:string;
    academicDescription:string;
    projects?:string[];
    curiosities?:string[];
}

export default AboutMe;