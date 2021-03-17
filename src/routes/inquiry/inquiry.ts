import { Router, Request, Response } from "express";
import { inquiryController } from "../../controllers/inquiry/InquiryController";

import {
  writeInquiry,
  readInquiry,
  securedWithQuery,
  createInquiry,
  secured,
  checkIfUpdate,
} from "../../middleware";

export const router = Router();

router.get(
  "/",
  securedWithQuery,
  readInquiry,
  async (req: Request, res: Response) => {
    try {
      await inquiryController.read(req, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.get(
  "/all",
  secured,
  readInquiry,
  async (req: Request, res: Response) => {
    try {
      await inquiryController.readAll(req, res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.get("/guest", secured,createInquiry, async(req:Request, res:Response)=>{
  try {
    await inquiryController.createGuest(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
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
