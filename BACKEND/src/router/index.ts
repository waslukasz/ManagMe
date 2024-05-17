import cors from "cors";
import express from "express";
import authentication from "./authentication";
import users from "./users";
import projects from "./projects";
import functionalities from "./functionalities";
import tasks from "./tasks";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

export default (): express.Router => {
  authentication(router);
  users(router);
  projects(router);
  functionalities(router);
  tasks(router);

  return router;
};
