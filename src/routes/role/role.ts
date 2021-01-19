import express, { Request, Response } from "express";
import { roleController } from "../../controllers/role/RoleController";

export const router = express.Router({
  strict: true,
});
router.get("/", (req: Request, res: Response) => {
  try {
    roleController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/", (req: Request, res: Response) => {
  try {
    roleController.create(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/delete", (req: Request, res: Response) => {
  try {
    roleController.delete(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
