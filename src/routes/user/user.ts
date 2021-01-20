import express, { Request, Response } from "express";
import { userController } from "../../controllers/user/UserController";

import { writeUsers, readUsers } from "../../middleware";

export const router = express.Router({
  strict: true,
});

//USER READ RIGHTS NEEDED
//-----------------------
router.get("/", readUsers, async (req: Request, res: Response) => {
  try {
    await userController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//-----------------------
router.get("/all", async (req: Request, res: Response) => {
  try {
    await userController.readAll(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//-----------------------
//USER WRITE RIGHTS NEEDED
//-----------------------
router.post("/", writeUsers, async (req: Request, res: Response) => {
  try {
    await userController.create(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//-----------------------
//GENERAL USER
//-------------
router.get("/me", async (req: Request, res: Response) => {
  try {
    await userController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
