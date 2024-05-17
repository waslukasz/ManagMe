import express from "express";
import authentication from "./authentication";
import users from "./users";
import projects from "./projects";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  projects(router);

  return router;
};
