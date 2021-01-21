import { Router, Request, Response } from "express";
import { machineController } from "../../controllers/machine/MachineController";
import { securedWithQuery, secured } from "../../middleware";

export const router = Router();

router.get("/", securedWithQuery, async (req: Request, res: Response) => {
  try {
    await machineController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", securedWithQuery, async (req: Request, res: Response) => {
  try {
    await machineController.create(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/all", secured, async (req: Request, res: Response) => {
  try {
    await machineController.readAll(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post(
  "/delete",
  securedWithQuery,
  async (req: Request, res: Response) => {
    try {
      await machineController.delete(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
