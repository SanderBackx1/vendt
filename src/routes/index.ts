import { router as userRouter } from "./user/user";

import { Router } from "express";
export const router = Router();

router.use("/user", userRouter);
