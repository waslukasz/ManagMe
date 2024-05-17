import { isAuthenticated } from "../middleware";
import { getAllUsers } from "../controllers/userController";
import express from "express";

export default (router: express.Router) => {
  router.get("/user", isAuthenticated, getAllUsers);
};
