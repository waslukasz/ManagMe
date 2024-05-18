import {
  createFunctionality,
  deleteFunctionalityById,
  getFunctionalities,
  getFunctionalityById,
  updateFunctionalityById,
} from "../db/functionalities";
import express from "express";
import jwt from "jsonwebtoken";
import IToken from "../interfaces/IToken";

export const getAllFunctionalities = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const functionalities = await getFunctionalities().populate(
      "owner project"
    );
    return res.status(200).json(functionalities);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getFunctionality = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const functionality = await getFunctionalityById(id).populate(
      "owner project"
    );
    if (!functionality) return res.sendStatus(404);
    return res.status(200).json(functionality);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addFunctionality = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, description, priority, project } = req.body;
    const { _auth } = req.cookies;
    const owner = (jwt.verify(_auth, process.env.JWT_SECRET) as IToken).id;

    if (!name || priority == undefined || !project || !owner)
      return res.sendStatus(400);

    const functionality = await createFunctionality({
      name,
      description,
      priority,
      project,
      owner,
    });

    return res.status(200).json(functionality).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateFunctionality = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, description, priority, status } = req.body;
    const { id } = req.params;

    if (!name) return res.sendStatus(400);

    const functionality = await updateFunctionalityById(id, {
      name,
      description,
      priority,
      status,
    });

    return res.status(200).json(functionality).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteFunctionality = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) return res.sendStatus(400);

    const functionality = await deleteFunctionalityById(id);
    if (!functionality) return res.sendStatus(404);

    return res.status(200).json(functionality).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
