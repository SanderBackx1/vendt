import { router as userRouter } from "./user/user";
import { router as roleRouter } from "./role/role";
import { router as companyRouter } from "./company/company";
import { router as machineRouter } from "./machine/machine";
import { router as inquiryRouter } from "./inquiry/inquiry";
import { router as authRouter } from "./auth/auth";
import { router as alertRouter } from "./alert/alert";
import { Request, Response, Router } from "express";

export const router = Router();
router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/company", companyRouter);
router.use("/machine", machineRouter);
router.use("/inquiry", inquiryRouter);
router.use("/auth", authRouter);
router.use("/alert", alertRouter);
export const helloworldrouter = Router();
helloworldrouter.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

