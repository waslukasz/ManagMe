import express from "express";
import {
  assignRole,
  auth,
  login,
  logout,
  oauth,
  register,
  revokeRole,
} from "../controllers/authenticationController";
import { isAdmin } from "../middleware";

export default (router: express.Router) => {
  router.get("/auth", auth);
  router.post("/oauth", oauth);
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);
  router.post("/auth/register", register);
  router.post("/auth/role/assign", isAdmin, assignRole);
  router.post("/auth/role/revoke", isAdmin, revokeRole);
};
