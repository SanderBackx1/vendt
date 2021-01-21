import { Router, Request, Response } from "express";
import { inquiryController } from "../../controllers/inquiry/InquiryController";
export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    await inquiryController.read(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/all", async (req: Request, res: Response) => {
  try {
    await inquiryController.readAll(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    await inquiryController.create(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update
router.post("/", async (req: Request, res: Response) => {
  try {
    await inquiryController.update(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/delete", async (req: Request, res: Response) => {
  try {
    await inquiryController.delete(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
