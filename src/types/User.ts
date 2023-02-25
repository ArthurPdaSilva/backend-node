interface User{
    _id?:string,
    name:string,
    email:string,
    password:string,
    rules?: string[]
}
export default User;