import express from "express";
import {
  assignRole,
  login,
  register,
  revokeRole,
} from "../controllers/authenticationController";
import { isAdmin } from "../middleware";

export default (router: express.Router) => {
  router.post("/auth/login", login);
  router.post("/auth/register", register);
  router.post("/auth/role/assign", isAdmin, assignRole);
  router.post("/auth/role/revoke", isAdmin, revokeRole);
};
