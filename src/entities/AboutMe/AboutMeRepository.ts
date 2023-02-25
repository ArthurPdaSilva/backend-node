import RepositoryTemplate from "../../templates/RepositoryTemplate";
import AboutMeModel from "./AboutMeModel";

export default class AboutMeRepository extends RepositoryTemplate{

    constructor(){

        super( AboutMeModel );
    }
}