import express, { NextFunction, Request, Response } from "express";
import { IUser, User, UserDocument } from "../model/User";
import RoleManager from "../manager/RoleManager";
import { Types } from "mongoose";
import { Company } from "../model/Company";
import jwt from "jsonwebtoken";
import { TokenInterface } from "../model/sharedInterfaces";

const roleManager = RoleManager.Instance;

export const hasQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.qry) throw new Error("No qry found in request body");
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const secured = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!process.env.TOKEN_SECRET) throw new Error("Server error");
    const { auth } = req.body;
    const authData = jwt.verify(
      auth,
      process.env.TOKEN_SECRET
    ) as TokenInterface;
    const user = await User.findOne({ _id: authData.uid })
      .populate("role")
      .populate("company");

    if (!user) throw new Error("no user found");
    if (!user.role) throw new Error("no role found");
    if (!user.company) throw new Error("no company found");
    req.body.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export const globalCompanyWrite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    if (role && role.permissions.company == "write" && role.permissions.global) {
      next();
    } else if (role && role.permissions.company == "write" && !role.permissions.global) {
      throw new Error("user has no global write rights");
    } else if (role && role.permissions.company != "write") {
      throw new Error("user has no company write rights");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const writeCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    if (!role || role.permissions.company != "write") {
      throw new Error("User has no company write rights");
    }
    next();
  } catch (err) {
    res.json(401).json({ error: err.message });
  }
};
export const readCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {role } = req.body.user;

    if (
      !role ||
      !(role.permissions.company == "read" || role.permissions.company == "write")
    ) {
      throw new Error("User has no company read rights");
    }
    next();
  } catch (err) {
    res.json(401).json({ error: err.message });
  }
};

export const writeMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    if (!role || role.permissions.company != "write") {
      throw new Error("User has no machine write rights");
    }
    next();
  } catch (err) {
    res.json(401).json({ error: err.message });
  }
};

export const readMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    if (
      !role ||
      !(role.permissions.company == "read" || role.permissions.company == "write")
    ) {
      throw new Error("User has no machine write rights");
    }
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const writeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    if (!role || !(role.permissions.users == "write")) {
      throw new Error("User has no user write rights");
    }
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const readUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    if (
      !role ||
      !(role.permissions.users == "read" || role.permissions.users == "write")
    ) {
      throw new Error("User has no user read rights");
    }
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const checkIfUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body.qry;
  if (id) {
    next("route");
  } else {
    next();
  }
};

export const writeInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    if (!role || !(role.permissions.inquiry == "write")) {
      throw new Error("User has no user write rights");
    }
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const readInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.user;
    if (
      !role ||
      !(role.permissions.inquiry == "read" || role.permissions.inquiry == "write")
    ) {
      throw new Error("User has no user write rights");
    }
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const securedMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { machineId } = req.body;
    if (!machineId) throw new Error("no machineId found");
    if (!Types.ObjectId.isValid(machineId))
      throw new Error("machineId is not valid");

    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export const isQrInquiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { qrinquiryId } = req.body.qry;
    if (qrinquiryId) {
      next();
    } else {
      next("route");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export const isGlobalAdmin=async(
  req: Request,
  res: Response,
  next: NextFunction
) =>{
  try{
    const {role} = req.body.user;
    if(role.permissions.global){
       next()
    }else{
      throw new Error("User is no global admin")
    }
  
  } catch(err){
    res.status(401).json({ error: err.message });

  }

}
export const securedWithQuery = [secured, hasQuery];
export const securedMachineWithQuery = [securedMachine, hasQuery];
export const securedMachineWithQueryHasQR = [
  securedMachine,
  hasQuery,
  isQrInquiry,
];
