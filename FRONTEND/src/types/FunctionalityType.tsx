import { Project } from "./ProjectType";

export type Functionality = {
  _id: string;
  name: string;
  description: string | null;
  priority: PriorityType;
  status: StatusType;
  project: Project;
  owner: FunctionalityOwner;
  created: Date;
};

export type FunctionalityOwner = {
  _id: string;
  username: string;
  name: string;
  surname: string;
  authentication: {
    roles: Array<string>;
  };
};

export type FunctionalityDto = {
  name: string;
  description: string | null;
  priority: PriorityType;
  project: string;
};

export enum StatusType {
  TODO = 0,
  DOING = 1,
  DONE = 2,
}

export enum PriorityType {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}
