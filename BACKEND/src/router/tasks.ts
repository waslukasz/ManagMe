import {
  addTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/taskController";
import { isAuthenticated } from "../middleware";
import express from "express";

export default (router: express.Router) => {
  router.get("/task", getAllTasks);
  router.get("/task/:id", getTask);
  router.post("/task", isAuthenticated, addTask);
  router.patch("/task/:id", updateTask);
  router.delete("/task/:id", deleteTask);
};
