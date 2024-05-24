import { Priority } from "./UtilTypes";

export type NotificationEntity = {
  _id: string;
  title: string;
  message: string;
  priority: number;
  read: boolean;
  recipient: string;
  date: Date;
};

export class Notification {
  id: string;
  title: string;
  message: string;
  priority: Priority;
  read: boolean;
  recipient: string;
  date: Date;

  constructor(entity?: NotificationEntity) {
    if (entity) {
      this.id = entity._id;
      this.title = entity.title;
      this.message = entity.message;
      this.priority = entity.priority;
      this.read = entity.read;
      this.recipient = entity.recipient;
      this.date = entity.date;
    } else {
      this.id = "";
      this.title = "";
      this.message = "";
      this.priority = 0;
      this.read = false;
      this.recipient = "";
      this.date = {} as Date;
    }
  }
}

export class NotificationDtoCreate {
  title: string;
  message: string;
  priority: number;
  recipient: string;

  constructor() {
    this.title = "";
    this.message = "";
    this.priority = 0;
    this.recipient = "";
  }
}
