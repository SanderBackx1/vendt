import express, { NextFunction, Request, Response } from "express";
import { IUser, User, UserDocument } from "../model/User";
import RoleManager from "../manager/RoleManager";

const roleManager = RoleManager.Instance;

export const writeUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.body;
  try {
    if (!uid) {
      throw new Error("No uid");
    }
    const user = await User.findById(uid);
    if (!user) {
      throw new Error("Uid not found");
    }
    const role = roleManager.getRoleById(user.role);
    if (role && role.permissions.users == "write") {
      next();
    } else {
      throw new Error("User has no access");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export const readUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.body;
  try {
    if (!uid) {
      throw new Error("No uid");
    }

    const user = await User.findById(uid);
    if (!user) {
      throw new Error("Uid not found");
    }
    const role = roleManager.getRoleById(user.role);
    if (
      role &&
      (role.permissions.users == "read" || role.permissions.users == "write")
    ) {
      next();
    } else {
      throw new Error("User has no access");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
