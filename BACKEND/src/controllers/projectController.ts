import {
  createProject,
  deleteProjectById,
  getProjectById,
  getProjects,
  updateProjectById,
} from "../db/projects";
import express from "express";

export const getAllProjects = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const projects = await getProjects();
    return res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);
    if (!project) return res.sendStatus(404);
    return res.status(200).json(project);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const addProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, description } = req.body;

    if (!name) return res.sendStatus(400);

    const project = await createProject({
      name,
      description,
    });

    return res.status(200).json(project).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    if (!name) return res.sendStatus(400);

    const project = await updateProjectById(id, {
      name,
      description,
    });

    return res.status(200).json(project).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    if (!id) return res.sendStatus(400);

    const project = await deleteProjectById(id);
    if (!project) return res.sendStatus(404);

    return res.status(200).json(project).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
