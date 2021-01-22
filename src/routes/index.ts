import { router as userRouter } from "./user/user";
import { router as roleRouter } from "./role/role";
import { router as companyRouter } from "./company/company";
import { router as machineRouter } from "./machine/machine";
import { router as inquiryRouter } from "./inquiry/inquiry";

import { Request, Response, Router } from "express";

export const router = Router();
router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/company", companyRouter);
router.use("/machine", machineRouter);
router.use("/inquiry", inquiryRouter);

export const helloworldrouter = Router();
helloworldrouter.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
