import { Project } from "../types/ProjectType";

export function GetProjectById(id:string) {
    let response: Project[] = GetAllProjects()
    let result = response.find((p) => p.id == id);
    return result;
}

export function GetAllProjects() {
    let response:string|null = localStorage.getItem('projects');
    if (response == null) response = '[]';
    let result:Project[] = JSON.parse(response) as Project[];
    return result;
}

export function AddProject(name:string, description:string) {
    let result:Project[] = GetAllProjects();
    let data:Project = {
        id: crypto.randomUUID(),
        name: name,
        description: description
    }
    result.push(data);
    UpdateProjectsData(result);
}

export function DeleteProject(data:Project) {
    let result:Project[] = GetAllProjects();
    result.splice(result.findIndex(p => p.id == data.id), 1);
    UpdateProjectsData(result);
}

export function UpdateProject(data:Project):Project {
    let result:Project[] = GetAllProjects();
    let project:Project = result.find((p) => p.id == data.id)!;
    project!.name = data.name;
    project!.description = data.description;

    UpdateProjectsData(result);
    return project;
}

function UpdateProjectsData(data:Project[]) {
    localStorage.setItem('projects', JSON.stringify(data));
}