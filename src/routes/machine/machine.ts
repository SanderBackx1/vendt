import { Router, Request, Response } from "express";
import { machineController } from "../../controllers/machine/MachineController";
export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    await machineController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await machineController.create(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    await machineController.readAll(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/delete", async (req: Request, res: Response) => {
  try {
    await machineController.delete(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
