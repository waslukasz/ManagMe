import { isAuthenticated } from "../middleware";
import { getAllUsers, getUser } from "../controllers/userController";
import express from "express";

export default (router: express.Router) => {
  router.get("/user", getAllUsers);
  router.get("/user/:id", getUser);
};
