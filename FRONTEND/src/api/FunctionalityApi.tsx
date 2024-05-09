import { Functionality, FunctionalityDto } from "../types/FunctionalityType";
import RepositoryApi from "./RepositoryApi"

export default class FunctionalityApi implements RepositoryApi<Functionality> {
    DbName:string = 'functionalities';
    DbSet:Array<Functionality> = this.GetDbSet();

    async GetById(id: string): Promise<Functionality> {
        return this.DbSet.find(p => p.id == id)!;
    }

    async GetAll(): Promise<Array<Functionality>> {
        return this.DbSet;
    }

    async Add(object:FunctionalityDto):Promise<Functionality> {
        let result:Functionality = {
            id: crypto.randomUUID(),
            name: object.name,
            description: object.description,
            priority: object.priority,
            project: object.project,
            createdTimestamp: new Date(),
            status: object.status,
            owner: object.owner
        }
        
        this.DbSet.push(result);
        this.UpdateApi();
        return result;
    }

    async Update(object:Functionality):Promise<Functionality> {
        let result = await this.GetById(object.id);
        result.name = object.name;
        result.description = object.description;
        result.priority = object.priority;
        result.project = object.project;
        result.owner = object.owner;
        result.status = object.status;
        this.UpdateApi();
        return result;
    }

    async Delete(object:Functionality): Promise<void> {
        let result = await this.GetById(object.id);
        this.DbSet.splice(this.DbSet.findIndex(p => p.id == result.id), 1);
        this.UpdateApi();
    }

    private GetDbSet() : Array<Functionality> {
        let result:any = localStorage.getItem(this.DbName);
        if (result == null) {
            return [] as Array<Functionality>;
        } else {
            result = JSON.parse(result) as Array<Functionality>
        }
        return result;
    }

    private UpdateApi(): void {
        localStorage.setItem(this.DbName, JSON.stringify(this.DbSet));
    }
}