import express, { NextFunction, Request, Response } from "express";
import { IUser, User, UserDocument } from "../model/User";
import RoleManager from "../manager/RoleManager";
import { Types } from "mongoose";

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
    if (!Types.ObjectId.isValid(uid)) throw new Error("uid not valid");

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
    throw err;
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

    if (!Types.ObjectId.isValid(uid)) throw new Error("uid not valid");

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
    throw err;
  }
};
