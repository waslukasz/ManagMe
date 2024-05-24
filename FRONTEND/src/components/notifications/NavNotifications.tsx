import { useEffect, useState } from "react";
import { NotificationIcon } from "../../assets";
import Notification from "./Notification.tsx";
import { NotificationService } from "../../services/NotificationsService.ts";
import { Notification as NotificationType } from "../../types/NotificationTypes.ts";
import useAuth from "../../hooks/useAuth.tsx";

export default function NavNotifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [count, setCount] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const auth = useAuth();

  useEffect(() => {
    NotificationService.list().subscribe((x) => {
      setNotifications(
        x.filter((notification) => notification.recipient == auth.user?.id)
      );
      setCount(
        x.filter((notification) => notification.recipient == auth.user?.id)
          .length
      );
    });
  }, []);

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`bg-gray-700 p-1.5 rounded cursor-pointer hover:bg-gray-600 ${
          (count > 0 && "fill-red-500 hover:fill-red-400") ||
          "fill-blue-300 hover:fill-blue-200"
        }`}
      >
        <NotificationIcon />
      </div>
      {isOpen && (
        <div className="absolute z-50 top-12 right-0 text-black bg-white shadow min-w-64 rounded overflow-hidden font-sans">
          <div>
            <span className="p-1 font-semibold font-sans">
              {(count > 0 && <>New notifications: {count}</>) || (
                <>No new notifications.</>
              )}
            </span>
            <hr />
          </div>
          {notifications.map((notification) => (
            <Notification key={notification.id} data={notification} />
          ))}
        </div>
      )}
    </div>
  );
}
