import express, { Request, Response } from "express";
import { inquiryController } from "../../controllers/inquiry/InquiryController";
import { userController } from "../../controllers/user/UserController";
import { writeUser, readUser, secured, checkIfUpdate } from "../../middleware";

export const router = express.Router({
  strict: true,
});

//USER READ RIGHTS NEEDED
//-----------------------
router.get("/", readUser, async (req: Request, res: Response) => {
  try {
    await userController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//-----------------------
router.get("/all", secured, readUser, async (req: Request, res: Response) => {
  try {
    await userController.readAll(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//-----------------------
//USER WRITE RIGHTS NEEDED
//-----------------------
router.post("/", writeUser, async (req: Request, res: Response) => {
  try {
    await userController.create(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/delete", writeUser, async (req: Request, res: Response) => {
  try {
    await userController.delete(req, res);
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

//INQUIRY
router.post("/inquiry", async (req: Request, res: Response) => {
  try {
    await inquiryController.create(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
