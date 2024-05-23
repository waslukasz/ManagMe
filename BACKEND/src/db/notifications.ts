import mongoose, { SchemaTypes } from "mongoose";

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  priority: { type: Number, required: true },
  read: { type: Boolean, default: false },
  recipient: { type: SchemaTypes.ObjectId, ref: "User", required: true },
});

export const NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema
);

export const getAllNotifications = () => NotificationModel.find();
export const getNotificationsById = (id: string) =>
  NotificationModel.findById(id);
export const getNotificationsByUser = (userId: string) =>
  NotificationModel.find({ recipient: userId });
export const createNotification = (values: Record<string, any>) =>
  new NotificationModel(values)
    .save()
    .then((notification) => notification.toObject());
export const markNotificationAsReadById = (id: string) =>
  NotificationModel.findByIdAndUpdate(id, { read: true });
export const deleteNotificationById = (id: string) =>
  NotificationModel.findByIdAndDelete({ _id: id });
export const updateNotificationById = (
  id: string,
  values: Record<string, any>
) => NotificationModel.findByIdAndUpdate(id, values);
