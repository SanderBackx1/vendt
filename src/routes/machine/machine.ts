import { Router, Request, Response } from "express";
import { inquiryController } from "../../controllers/inquiry/InquiryController";
import { machineController } from "../../controllers/machine/MachineController";
import {
  securedWithQuery,
  readMachine,
  writeMachine,
  secured,
  checkIfUpdate,
  securedMachineWithQuery,
  securedMachineWithQueryHasQR,
} from "../../middleware";

export const router = Router();

router.get(
  "/",
  securedWithQuery,
  readMachine,
  async (req: Request, res: Response) => {
    try {
      await machineController.read(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.post(
  "/",
  securedWithQuery,
  checkIfUpdate,
  writeMachine,
  async (req: Request, res: Response) => {
    try {
      await machineController.create(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.post("/", async (req: Request, res: Response) => {
  try {
    await machineController.update(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get(
  "/all",
  secured,
  readMachine,
  async (req: Request, res: Response) => {
    try {
      await machineController.readAll(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.post(
  "/delete",
  securedWithQuery,
  writeMachine,
  async (req: Request, res: Response) => {
    try {
      await machineController.delete(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
router.post("/validate", securedMachineWithQuery, async(req:Request, res:Response)=>{
  try{
    await inquiryController.validate(req,res);

  }catch(err){
    res.status(400).json({ error: err.message });
  }
})
router.post("/success",securedMachineWithQueryHasQR, async(req:Request, res:Response)=>{
  try{
    await inquiryController.successQR(req,res);

  }catch(err){
    res.status(400).json({ error: err.message });
  }
})
router.post("/success", async(req:Request, res:Response)=>{
  try{
    await inquiryController.success(req,res);

  }catch(err){
    res.status(400).json({ error: err.message });
  }
})