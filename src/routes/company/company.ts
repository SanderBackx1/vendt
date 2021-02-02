import express, { Request, Response } from "express";
import { companyController } from "../../controllers/company/CompanyController";
import {
  checkIfUpdate,
  readCompany,
  secured,
  securedWithQuery,
  writeCompany,
  isGlobalAdmin,
  checkGlobal
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
  isGlobalAdmin,
  async (req: Request, res: Response) => {
    try {
      await companyController.create(req, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.post("/",secured,checkGlobal, async (req: Request, res: Response) => {
  try {
    await companyController.update(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/all",secured, readCompany,isGlobalAdmin, async (req: Request, res: Response) => {
  try {
    await companyController.readAll(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/delete",securedWithQuery, isGlobalAdmin, async (req: Request, res: Response) => {
  try {
    await companyController.delete(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
