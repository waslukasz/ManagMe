import express from "express";
import authentication from "./authentication";
import users from "./users";
import projects from "./projects";
import functionalities from "./functionalities";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  projects(router);
  functionalities(router);

  return router;
};
