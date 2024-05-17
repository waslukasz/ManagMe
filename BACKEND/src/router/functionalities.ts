import {
  addFunctionality,
  deleteFunctionality,
  getAllFunctionalities,
  getFunctionality,
  updateFunctionality,
} from "../controllers/functionalityController";
import { isAuthenticated } from "../middleware";
import express from "express";

export default (router: express.Router) => {
  router.get("/functionality", getAllFunctionalities);
  router.get("/functionality/:id", getFunctionality);
  router.post("/functionality", isAuthenticated, addFunctionality);
  router.patch("/functionality/:id", updateFunctionality);
  router.delete("/functionality/:id", deleteFunctionality);
};
