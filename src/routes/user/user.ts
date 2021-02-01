import express, { Request, Response } from "express";
import { inquiryController } from "../../controllers/inquiry/InquiryController";
import { userController } from "../../controllers/user/UserController";
import { writeUser, readUser, secured, securedWithQuery,checkIfUpdate } from "../../middleware";

export const router = express.Router({
  strict: true,
});

//USER READ RIGHTS NEEDED
//-----------------------
router.get("/", secured, readUser, async (req: Request, res: Response) => {
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
router.post("/", securedWithQuery, checkIfUpdate, async (req: Request, res: Response) => {
  try {
    await userController.create(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    await userController.update(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post("/delete", securedWithQuery, writeUser, async (req: Request, res: Response) => {
  try {
    await userController.delete(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//-----------------------
//GENERAL USER
//-------------
router.get("/me", secured,async (req: Request, res: Response) => {
  try {
    await userController.me(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//INQUIRY
router.post("/inquiry",secured, async (req: Request, res: Response) => {
  try {
    await inquiryController.create(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//INQUIRY
router.get("/inquiry",secured, async (req: Request, res: Response) => {
  try {
    await inquiryController.create(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
