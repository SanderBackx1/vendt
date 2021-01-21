import express, { Request, Response } from "express";
import { companyController } from "../../controllers/company/CompanyController";
import {
  checkIfUpdate,
  readCompany,
  secured,
  securedWithQuery,
  writeCompany,
} from "../../middleware";

export const router = express.Router({
  strict: true,
});

router.get("/", secured, readCompany, async (req: Request, res: Response) => {
  try {
    await companyController.read(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post(
  "/",
  securedWithQuery,
  writeCompany,
  checkIfUpdate,
  async (req: Request, res: Response) => {
    try {
      await companyController.create(req, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.post("/", async (req: Request, res: Response) => {
  try {
    await companyController.update(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/delete", async (req: Request, res: Response) => {
  try {
    await companyController.delete(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
