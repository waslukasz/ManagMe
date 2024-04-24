export type Functionality = {
    id:string,
    name:string,
    description:string,
    priority:PriorityType,
    project:string,
    createdTimestamp:Date,
    status:StatusType,
    owner:string
}

export type FunctionalityDto = {
    name:string,
    description:string,
    priority:PriorityType,
    project:string,
    createdTimestamp: Date,
    status:StatusType,
    owner:string
}

export enum StatusType {
    TODO = 0,
    DOING = 1,
    DONE = 2
}

export enum PriorityType {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2
}