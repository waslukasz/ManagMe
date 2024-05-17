import { createUser, getUserByUsername } from "../db/users";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.sendStatus(400);

    const user = await getUserByUsername(username).select(
      "+authentication.password"
    );
    if (!user) return res.sendStatus(400);

    const authSuccess = await bcrypt.compare(
      password,
      user.authentication.password
    );

    if (!authSuccess) return res.sendStatus(403);

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        roles: user.authentication.roles,
      },
      process.env.JWT_SECRET
    );

    user.authentication.sessionToken = token;
    await user.save();

    return res.cookie("_auth", token).status(200).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password, roles, name, surname } = req.body;

    if (!username || !password) return res.sendStatus(400);
    const existingUser = await getUserByUsername(username);
    if (existingUser) return res.sendStatus(400);

    const salt = await bcrypt.genSalt(12);
    const user = await createUser({
      username,
      authentication: {
        salt,
        password: await bcrypt.hash(password, salt),
        roles,
      },
      name,
      surname,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const assignRole = async (
  req: express.Request,
  res: express.Response
) => {
  const { username, role } = req.body;
  if (!username || !role) return res.sendStatus(400);
  const user = await getUserByUsername(username);
  if (!user) return res.sendStatus(400);
  if (user.authentication.roles.includes(role)) return res.sendStatus(400);
  user.authentication.roles.push(role);
  user.save();
  return res.sendStatus(200);
};

export const revokeRole = async (
  req: express.Request,
  res: express.Response
) => {
  const { username, role } = req.body;
  if (!username || !role) return res.sendStatus(400);
  const user = await getUserByUsername(username);
  if (!user) return res.sendStatus(400);
  if (!user.authentication.roles.includes(role)) return res.sendStatus(400);
  user.authentication.roles.splice(user.authentication.roles.indexOf(role), 1);
  user.save();
  return res.sendStatus(200);
};
