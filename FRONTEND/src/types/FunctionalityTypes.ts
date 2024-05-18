import { Project, ProjectEntity } from "./ProjectTypes";
import { User, UserEntity } from "./UserTypes";
import { Priority, Status } from "./UtilTypes";

export type FunctionalityEntity = {
  _id: string;
  name: string;
  description: string | null;
  priority: Priority;
  status: Status;
  project: ProjectEntity;
  owner: UserEntity;
  created: Date;
};

export class Functionality {
  id: string;
  name: string;
  description: string | null;
  priority: Priority;
  status: Status;
  project: Project;
  owner: User;
  created: Date;

  constructor(entity?: FunctionalityEntity) {
    if (entity) {
      this.id = entity._id;
      this.name = entity.name;
      this.description = entity.description;
      this.priority = entity.priority;
      this.status = entity.status;
      this.project = new Project(entity.project);
      this.owner = new User(entity.owner);
      this.created = entity.created;
    } else {
      this.id = "";
      this.name = "";
      this.description = "";
      this.priority = 0;
      this.status = 0;
      this.project = {} as Project;
      this.owner = {} as User;
      this.created = {} as Date;
    }
  }
}

export class FunctionalityDtoCreate {
  name: string;
  description: string | null;
  priority: Priority;
  project: string;

  constructor(projectId: string) {
    this.name = "";
    this.description = "";
    this.priority = 0;
    this.project = projectId;
  }
}

export class FunctionalityDtoUpdate {
  name: string;
  description: string | null;
  priority: Priority;
  status: Status;

  constructor(entity?: Functionality) {
    if (entity) {
      this.name = entity.name;
      this.description = entity.description;
      this.priority = entity.priority;
      this.status = entity.status;
    } else {
      this.name = "";
      this.description = "";
      this.priority = 0;
      this.status = 0;
    }
  }
}
