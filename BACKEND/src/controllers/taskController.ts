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
    const tasks = await getTasks()
      .populate("functionality assignedUser")
      .populate({
        path: "functionality",
        populate: { path: "project" },
      })
      .populate({
        path: "functionality",
        populate: { path: "owner" },
      });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getTask = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id)
      .populate("functionality assignedUser")
      .populate({
        path: "functionality",
        populate: { path: "project" },
      })
      .populate({
        path: "functionality",
        populate: { path: "owner" },
      });
    if (!task) return res.sendStatus(404);
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addTask = async (req: express.Request, res: express.Response) => {
  try {
    const { name, description, functionality, estimated } = req.body;

    if (!name || !functionality) return res.sendStatus(400);

    const task = await createTask({
      name,
      description,
      functionality,
      estimated,
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

    const task = await updateTaskById(id, {
      name,
      description,
      status,
      start,
      end,
      estimated,
      assignedUser,
    }).populate("assignedUser");

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
