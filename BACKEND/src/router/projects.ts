import {
  addProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
} from "../controllers/projectController";
import { isAuthenticated } from "../middleware";
import express from "express";

export default (router: express.Router) => {
  router.get("/project", getAllProjects);
  router.get("/project/:id", getProject);
  router.post("/project", addProject);
  router.patch("/project/:id", updateProject);
  router.delete("/project/:id", deleteProject);
};
