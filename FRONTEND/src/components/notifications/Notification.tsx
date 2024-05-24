import { useState } from "react";
import { Notification as NotificationType } from "../../types/NotificationTypes";

export default function Notification({ data }: { data: NotificationType }) {
  const [notification, setNotification] = useState<NotificationType>(data);

  async function handleDelete() {
    console.log("implement delete");
  }

  return (
    <div
      onClick={handleDelete}
      className="p-2 border-b border-gray-200 text-sm hover:bg-gray-300 cursor-pointer border-solid"
    >
      <div className="font-semibold italic">{notification.title}</div>
      <div className="text-sm">{notification.message}</div>
    </div>
  );
}
