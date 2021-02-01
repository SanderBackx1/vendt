import { Router, Request, Response, response } from "express";
import { alertController } from "../../controllers/alert/AlertController";
export const router = Router();

import { checkIfUpdate,readAlert,writeAlert, secured, securedWithQuery } from "../../middleware";
router.get("/", secured,readAlert, async (req: Request, res: Response) => {
  try {
    await alertController.read(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post(
  "/",
  securedWithQuery,
  writeAlert,
  checkIfUpdate,
  async (req: Request, res: Response) => {
    try {
      await alertController.create(req, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.post("/", async (req: Request, res: Response) => {
  try {
    await alertController.update(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/delete",writeAlert,securedWithQuery, async (req: Request, res: Response) => {
  try {
    await alertController.delete(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
