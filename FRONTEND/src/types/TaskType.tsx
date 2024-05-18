import { Functionality } from "./FunctionalityType";
import { UserDb, UserProfile } from "./UserType";

export type Task = {
  _id: string;
  name: string;
  description: string | null;
  status: StatusType;
  created: Date;
  start: Date | null;
  end: Date | null;
  estimated: Date | null;
  functionality: Functionality;
  assignedUser: UserDb | null;
};

export type TaskDto = {
  name: string;
  description: string | null;
  start: Date | null;
  end: Date | null;
  estimated: Date | null;
  assignedUser: UserProfile | null;
};

export type TaskEntity = {};

export enum StatusType {
  TODO = 0,
  DOING = 1,
  DONE = 2,
}
