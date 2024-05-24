import { BehaviorSubject, Observable, take } from "rxjs";
import axios from "../api/axios";
import {
  NotificationEntity,
  Notification,
  NotificationDtoCreate,
} from "../types/NotificationTypes";

let notifications = (
  await axios.get<NotificationEntity[]>("/notification")
).data.map((entity) => new Notification(entity));

const observable: BehaviorSubject<Notification[]> = new BehaviorSubject<
  Notification[]
>(notifications);

const observableCount: BehaviorSubject<number> = new BehaviorSubject<number>(
  notifications.length
);

export class NotificationService {
  static list = (): BehaviorSubject<Notification[]> => {
    return observable;
  };

  static count = (): Observable<number> => {
    return observableCount;
  };

  static send = async (notification: NotificationDtoCreate): Promise<void> => {
    axios
      .post<NotificationEntity>(`/notification/`, notification)
      .then((response) => {
        let result: Notification[] = [];
        observable.pipe(take(1)).subscribe((value) => (result = value));
        result.push(new Notification(response.data));
        observable.next(result);
        observableCount.next(result.length);
      });
  };
}
