import { Router, Request, Response } from "express";
export const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented yet");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/all", async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented yet");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented yet");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update
router.post("/", async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented yet");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/delete", async (req: Request, res: Response) => {
  try {
    throw new Error("Not implemented yet");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
