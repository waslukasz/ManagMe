import { Task, TaskDto } from "../types/TaskType";
import RepositoryApi from "./RepositoryApi"

export default class TaskApi implements RepositoryApi<Task> {
    DbName:string = 'tasks';
    DbSet:Array<Task> = this.GetDbSet();

    async GetById(id: string): Promise<Task> {
        return this.DbSet.find(p => p.id == id)!;
    }

    async GetAll(): Promise<Array<Task>> {
        return this.DbSet;
    }

    async Add(object:TaskDto):Promise<Task> {
        let result:Task = {
            id: crypto.randomUUID(),
            name: object.name,
            description: object.description,
            functionalityId: object.functionalityId,
            status: 0,
            createdTimestamp: new Date(),
            startTime: null,
            endTime: null,
            estimatedTime: object.estimatedTime,
            assignedUserId: null
        }
        
        this.DbSet.push(result);
        this.UpdateApi();
        return result;
    }

    async Update(object:Task):Promise<Task> {
        let result = await this.GetById(object.id);
        result.name = object.name,
        result.description = object.description,
        result.functionalityId = object.functionalityId;
        result.status = object.status;
        result.startTime = object.startTime,
        result.endTime = object.endTime,
        result.estimatedTime = object.estimatedTime;
        result.assignedUserId = object.assignedUserId;
        this.UpdateApi();
        return result;
    }

    async Delete(object:Task): Promise<void> {
        let result = await this.GetById(object.id);
        this.DbSet.splice(this.DbSet.findIndex(p => p.id == result.id), 1);
        this.UpdateApi();
    }

    private GetDbSet() : Array<Task> {
        let result:any = localStorage.getItem(this.DbName);
        if (result == null) {
            return [] as Array<Task>;
        } else {
            result = JSON.parse(result) as Array<Task>
        }
        return result;
    }

    private UpdateApi(): void {
        localStorage.setItem(this.DbName, JSON.stringify(this.DbSet));
    }
}