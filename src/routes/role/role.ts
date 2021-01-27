import express, { Request, Response } from "express";
import { roleController } from "../../controllers/role/RoleController";

import {
  writeUser,
  readUser,
  secured,
  securedWithQuery,
  checkIfUpdate,
} from "../../middleware";

//Middleware for users because there is no role permission. We just check if they have read/write for users

export const router = express.Router({
  strict: true,
});
router.get(
  "/",
  secured,
  readUser,
  async (req: Request, res: Response) => {
    try {
      await roleController.read(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
router.get("/all", secured, readUser, async (req: Request, res: Response) => {
  try {
    await roleController.readAll(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post(
  "/",
  securedWithQuery,
  writeUser,
  checkIfUpdate,
  async (req: Request, res: Response) => {
    try {
      await roleController.create(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.post("/", async (req: Request, res: Response) => {
  try {
    await roleController.update(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post(
  "/delete",
  securedWithQuery,
  writeUser,
  async (req: Request, res: Response) => {
    try {
      await roleController.delete(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
