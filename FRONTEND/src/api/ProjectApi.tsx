import { Project, ProjectDto } from "../types/ProjectType";
import RepositoryApi from "./RepositoryApi"

export default class ProjectApi implements RepositoryApi<Project> {
    DbName:string = 'projects';
    DbSet:Array<Project> = this.GetDbSet();

    async GetById(id: string): Promise<Project> {
        return this.DbSet.find(p => p.id == id)!;
    }

    async GetAll(): Promise<Array<Project>> {
        return this.DbSet;
    }

    async Add(object:ProjectDto):Promise<Project> {
        let result:Project = {
            id: crypto.randomUUID(),
            name: object.name,
            description: object.description
        }
        this.DbSet.push(result);
        this.UpdateApi();
        return result;
    }

    async Update(object:Project):Promise<Project> {
        let result = await this.GetById(object.id);
        result.name = object.name;
        result.description = object.description;
        this.UpdateApi();
        return result;
    }

    async Delete(object:Project): Promise<void> {
        let result = await this.GetById(object.id);
        this.DbSet.splice(this.DbSet.findIndex(p => p.id == result.id), 1);
        this.UpdateApi();
    }

    SetActive(object:Project): void {
        localStorage.setItem('activeProject', object.id);
    }

    GetActiveId(): string|null {
        let result:any = localStorage.getItem('activeProject');
        return result;
    }
    
    private GetDbSet() : Array<Project> {
        let result:any = localStorage.getItem(this.DbName);
        if (result == null) {
            return [] as Array<Project>;
        } else {
            result = JSON.parse(result) as Array<Project>
        }
        return result;
    }

    private UpdateApi(): void {
        if (this.DbSet.length > 0 && this.DbSet.find(p => p.id == this.GetActiveId()) == null) this.SetActive(this.DbSet[0]);
        localStorage.setItem(this.DbName, JSON.stringify(this.DbSet));
    }
}