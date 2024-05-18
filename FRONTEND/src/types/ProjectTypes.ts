export type ProjectEntity = {
  _id: string;
  name: string;
  description: string | null;
};

export class Project {
  id: string;
  name: string;
  description: string | null;

  constructor(entity?: ProjectEntity) {
    if (entity) {
      this.id = entity._id;
      this.name = entity.name;
      this.description = entity.description;
    } else {
      this.id = "";
      this.name = "";
      this.description = null;
    }
  }
}

export class ProjectDto {
  name: string;
  description: string | null;

  constructor(entity?: Project) {
    if (entity) {
      this.name = entity.name;
      this.description = entity.description;
    } else {
      this.name = "";
      this.description = "";
    }
  }
}
