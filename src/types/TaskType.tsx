export type Task = {
    id:string,
    name:string,
    description:string,
    functionalityId:string
    status:StatusType,
    createdTimestamp:Date,
    startTime: Date|null,
    endTime: Date|null,
    estimatedTime: Date,
    assignedUserId:string|null
}

export type TaskDto = {
    name:string,
    description:string,
    functionalityId:string
    estimatedTime: Date,
}

export enum StatusType {
    TODO = 0,
    DOING = 1,
    DONE = 2
}