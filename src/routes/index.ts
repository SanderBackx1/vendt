import { router as userRouter } from "./user/user";
import { router as roleRouter } from "./role/role";
import { router as companyRouter } from "./company/company";

import { Request, Response, Router } from "express";

export const router = Router();
router.use("/user", userRouter);
router.use("/role", roleRouter);
router.use("/company", companyRouter);

export const helloworldrouter = Router();
helloworldrouter.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
