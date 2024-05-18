import { Project } from "./ProjectType";
import { UserDb } from "./UserType";

export type Functionality = {
  _id: string;
  name: string;
  description: string | null;
  priority: PriorityType;
  status: StatusType;
  project: Project;
  owner: UserDb;
  created: Date;
};

export type FunctionalityDto = {
  name: string;
  description: string | null;
  priority: PriorityType;
  status: StatusType;
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
