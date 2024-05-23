import {
  getNotificationsByUser,
  getNotificationsById,
  createNotification,
  markNotificationAsReadById,
  deleteNotificationById,
  getAllNotifications,
} from "../db/notifications";
import express from "express";

export const getAllNotification = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const notifications = await getAllNotifications();
    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getByIdNotification = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const notification = await getNotificationsById(id);
    if (!notification) return res.sendStatus(404);
    return res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getNotificationByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const notification = await getNotificationsByUser(id);
    if (!notification) return res.sendStatus(404);
    return res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addNotification = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, message, priority, recipient } = req.body;

    const notification = await createNotification({
      title,
      message,
      priority,
      recipient,
    });

    return res.status(200).json(notification).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const markAsReadNotification = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const notification = await markNotificationAsReadById(id);

    return res.status(200).json(notification).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteNotification = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) return res.sendStatus(400);

    const notification = await deleteNotificationById(id);
    if (!notification) return res.sendStatus(404);

    return res.status(200).json(notification).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
