import express, { Request, Response } from "express";
import { roleController } from "../../controllers/role/RoleController";

import { writeUsers, readUsers } from "../../middleware";

//Middleware for users because there is no role permission. We just check if they have read/write for users

export const router = express.Router({
  strict: true,
});
router.get("/", async (req: Request, res: Response) => {
  console.log("reading role");

  try {
    await roleController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/", writeUsers, async (req: Request, res: Response) => {
  try {
    await roleController.create(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/delete", readUsers, async (req: Request, res: Response) => {
  try {
    await roleController.delete(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
