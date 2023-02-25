import RepositoryTemplate from "../../templates/RepositoryTemplate";
import UserModel from "./UserModel";

export default class UserRepository extends RepositoryTemplate{

    constructor(){

        super( UserModel );
    }

    public async findByEmail(email: string){
        return await this.mongoModel.findOne({ email });
    }
}