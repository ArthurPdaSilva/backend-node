import User from "../types/User";

export default class UserDTO {
    private uuid:string;
    private name:string;
    private email:string;
    private rules:string[];

    constructor( user:User ){
        this.uuid = user._id;
        this.name = user.name;
        this.email = user.email;
        this.rules = user.rules;
    }

    public static converter( users: User[] ): UserDTO[] {
        if(users.length != 0){
            return users.map( ( userItem ) => new UserDTO(userItem) );
        }
        return undefined;
    }
}