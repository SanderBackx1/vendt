import express, { Request, Response } from "express";
import { userController } from "../../controllers/user/UserController";

import { writeUsers, readUsers } from "../../middleware";

export const router = express.Router({
  strict: true,
});

//USER READ RIGHTS NEEDED
//-----------------------
router.get("/", readUsers, (req: Request, res: Response) => {
  try {
    userController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//-----------------------
router.get("/all", (req: Request, res: Response) => {
  try {
    userController.readAll(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//-----------------------
//USER WRITE RIGHTS NEEDED
//-----------------------
router.post("/", writeUsers, (req: Request, res: Response) => {
  try {
    userController.create(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//-----------------------
//GENERAL USER
//-------------
router.get("/me", (req: Request, res: Response) => {
  try {
    userController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
