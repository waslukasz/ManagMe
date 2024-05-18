import { getUserBySessionToken } from "../db/users";
import {
  createTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from "../db/tasks";
import express from "express";

export const getAllTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tasks = await getTasks().populate("functionality assignedUser");
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getTask = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id).populate("functionality assignedUser");
    if (!task) return res.sendStatus(404);
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addTask = async (req: express.Request, res: express.Response) => {
  try {
    const { name, description, functionality } = req.body;
    const { _auth } = req.cookies;

    if (!name || !functionality || !_auth) return res.sendStatus(400);

    const user = await getUserBySessionToken(_auth);
    const assignedUser = user._id;
    const task = await createTask({
      name,
      description,
      functionality,
      assignedUser,
    });

    return res.status(200).json(task).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, description, status, start, end, estimated, assignedUser } =
      req.body;
    const { id } = req.params;

    if (!name) return res.sendStatus(400);

    const task = await updateTaskById(id, {
      name,
      description,
      status,
      start,
      end,
      estimated,
      assignedUser,
    });

    return res.status(200).json(task).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(400);

    const task = await deleteTaskById(id);
    if (!task) return res.sendStatus(404);

    return res.status(200).json(task).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
