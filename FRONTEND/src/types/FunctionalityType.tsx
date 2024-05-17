export type Functionality = {
  id: string;
  name: string;
  description: string | null;
  priority: PriorityType;
  project: string;
  createdTimestamp: Date;
  status: StatusType;
  owner: FunctionalityOwner;
};

export type FunctionalityOwner = {
  id: string;
  username: string;
  name: string;
  surname: string;
};

export type FunctionalityDto = {
  name: string;
  description: string | null;
  priority: PriorityType;
  project: string;
  status: StatusType;
  owner: FunctionalityOwner;
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
