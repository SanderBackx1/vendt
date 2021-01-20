import { router as userRouter } from "./user/user";
import { router as roleRouter } from "./role/role";
import express, { Request, Response } from "express";

import { Router } from "express";
export const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
router.use("/user", userRouter);
router.use("/role", roleRouter);
