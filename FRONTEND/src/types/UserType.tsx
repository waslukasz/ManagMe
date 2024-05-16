export type User = {
    id:string,
    name:string,
    surname:string,
    roles:Array<Role>,
    username:string,
    password:string
}

export enum Role {
    Admin = 0,
    DevOps = 1,
    Developer = 2,
}