import {
  addNotification,
  deleteNotification,
  getAllNotification,
  getByIdNotification,
  getNotificationByUserId,
  markAsReadNotification,
} from "../controllers/notificationController";
import express from "express";

export default (router: express.Router) => {
  router.get("/notification", getAllNotification);
  router.get("/notification/:id", getByIdNotification);
  router.get("/notification/user/:id", getNotificationByUserId);
  router.post("/notification", addNotification);
  router.patch("/notification/:id", markAsReadNotification);
  router.delete("/notification/:id", deleteNotification);
};
