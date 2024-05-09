export type User = {
    id:string,
    name:string,
    surname:string
    role:Role
}

export enum Role {
    Admin = 0,
    DevOps = 1,
    Developer = 2,
}