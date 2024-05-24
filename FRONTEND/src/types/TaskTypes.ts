import { addDays } from "date-fns";
import { Functionality, FunctionalityEntity } from "./FunctionalityTypes";
import { User, UserEntity } from "./UserTypes";
import { Status } from "./UtilTypes";

export type TaskEntity = {
  _id: string;
  name: string;
  description: string | null;
  status: Status;
  created: Date;
  start: Date | null;
  end: Date | null;
  estimated: Date | null;
  functionality: FunctionalityEntity;
  assignedUser: UserEntity | null;
};

export class Task {
  id: string;
  name: string;
  description: string | null;
  status: Status;
  created: Date;
  start: Date | null;
  end: Date | null;
  estimated: Date | null;
  functionality: Functionality;
  assignedUser: User | null;

  constructor(entity?: TaskEntity) {
    if (entity) {
      this.id = entity._id;
      this.name = entity.name;
      this.description = entity.description;
      this.status = entity.status;
      this.created = entity.created;
      this.start = entity.start;
      this.end = entity.end;
      this.estimated = entity.estimated;
      this.functionality = new Functionality(entity.functionality);
      this.assignedUser = new User(entity.assignedUser!);
    } else {
      this.id = "";
      this.name = "";
      this.description = "";
      this.status = 0;
      this.created = {} as Date;
      this.start = null;
      this.end = null;
      this.estimated = null;
      this.functionality = {} as Functionality;
      this.assignedUser = {} as User;
    }
  }
}

export class TaskDtoCreate {
  name: string;
  description: string | null;
  functionality: string;
  estimated: Date | null;

  constructor(functionalityId: string) {
    this.name = "";
    this.description = "";
    this.functionality = functionalityId;
    this.estimated = addDays(new Date(), 7);
  }
}

export class TaskDtoUpdate {
  name: string;
  description: string | null;
  start: Date | null;
  end: Date | null;
  estimated: Date | null;

  constructor(entity?: Task) {
    if (entity) {
      this.name = entity.name;
      this.description = entity.description;
      this.start = entity.start;
      this.end = entity.end;
      this.estimated = entity.estimated;
    } else {
      this.name = "";
      this.description = "";
      this.start = null;
      this.end = null;
      this.estimated = null;
    }
  }
}

export class TaskDtoProceed {
  assignedUser: string | null;
  start: Date | null;
  end: Date | null;
  estimated: Date | null;
  status: Status;

  constructor(entity?: Task) {
    if (entity) {
      this.assignedUser = entity.assignedUser?.id ?? "";
      this.start = entity.start;
      this.end = entity.end;
      this.estimated = entity.estimated;
      this.status = entity.status;
    } else {
      this.assignedUser = "";
      this.start = null;
      this.end = null;
      this.estimated = null;
      this.status = 0;
    }
  }
}
