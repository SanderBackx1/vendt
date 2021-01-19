import { router as userRouter } from "./user/user";
import { router as roleRouter } from "./role/role";

import { Router } from "express";
export const router = Router();

router.use("/user", userRouter);
router.use("/role", roleRouter);
