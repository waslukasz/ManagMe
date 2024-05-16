export type Task = {
    id:string,
    name:string,
    description:string|null,
    functionalityId:string
    status:StatusType,
    createdTimestamp:Date,
    startTime: Date|null,
    endTime: Date|null,
    estimatedTime: Date|null,
    assignedUserId:string|null
}

export type TaskDto = {
    name:string,
    description:string|null,
    functionalityId:string
    estimatedTime: Date|null,
}

export enum StatusType {
    TODO = 0,
    DOING = 1,
    DONE = 2
}