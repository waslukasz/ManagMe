import {
  createTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from "../db/tasks";
import express from "express";
import jwt from "jsonwebtoken";
import IToken from "../interfaces/IToken";

export const getAllTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const functionalities = await getTasks();
    return res.status(200).json(functionalities);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getTask = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const functionality = await getTaskById(id);
    if (!functionality) return res.sendStatus(404);
    return res.status(200).json(functionality);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addTask = async (req: express.Request, res: express.Response) => {
  try {
    const { name, description, functionality } = req.body;

    if (!name || !functionality) return res.sendStatus(400);

    const task = await createTask({
      name,
      description,
      functionality,
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
    const { name, description, status, start, end, estimated } = req.body;
    const { id } = req.params;

    if (!name) return res.sendStatus(400);

    const task = await updateTaskById(id, {
      name,
      description,
      status,
      start,
      end,
      estimated,
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

    const functionality = await deleteTaskById(id);
    if (!functionality) return res.sendStatus(404);

    return res.status(200).json(functionality).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
