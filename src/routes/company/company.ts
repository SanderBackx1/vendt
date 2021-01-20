import express, { Request, Response } from "express";
import { companyController } from "../../controllers/company/CompanyController";
import { hasQuery, secured, globalCompanyWrite } from "../../middleware";

export const router = express.Router({
  strict: true,
});

router.get("/", secured, hasQuery, async (req: Request, res: Response) => {
  try {
    await companyController.read(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post(
  "/",
  secured,
  globalCompanyWrite,
  hasQuery,
  async (req: Request, res: Response) => {
    try {
      await companyController.create(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
router.post("/delete", async (req: Request, res: Response) => {
  try {
    await companyController.delete(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
