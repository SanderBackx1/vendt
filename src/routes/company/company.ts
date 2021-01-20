import express, { Request, Response } from "express";
import { companyController } from "../../controllers/company/CompanyController";

export const router = express.Router({
  strict: true,
});

router.get("/", async (req: Request, res: Response) => {
  try {
    await companyController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    await companyController.create(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/delete", async (req: Request, res: Response) => {
  try {
    await companyController.delete(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
