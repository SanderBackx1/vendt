import { Router, Request, Response, response } from "express";
import {alertController} from "../../controllers/alert/AlertController"
export const router = Router();


router.get(
    "/",
    async (req: Request, res: Response) => {
      try {
        await alertController.read(req,res)
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
);
router.post(
    "/",
    async (req: Request, res: Response) => {
      try {
        await alertController.create(req,res)
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
);
router.post(
    "/",
    async (req: Request, res: Response) => {
      try {
        await alertController.update(req,res)
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
);
router.post(
    "/delete",
    async (req: Request, res: Response) => {
      try {
        await alertController.delete(req,res)
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
);