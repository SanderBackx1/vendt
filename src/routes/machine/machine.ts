import { Router, Request, Response } from "express";
import { inquiryController } from "../../controllers/inquiry/InquiryController";
import { machineController } from "../../controllers/machine/MachineController";
import { alertController } from "../../controllers/alert/AlertController";
import {
  securedWithQuery,
  readMachine,
  writeMachine,
  secured,
  checkIfUpdate,
  securedMachineWithQuery,
  securedMachineWithQueryHasQR,
  securedMachineWithQueryHasRFID,
  checkGlobal  

} from "../../middleware";

export const router = Router();

router.get(
  "/",
  secured,
  readMachine,
  checkGlobal,
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
  writeMachine,
  checkGlobal,
  checkIfUpdate,
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
  checkGlobal,
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
  checkGlobal,
  async (req: Request, res: Response) => {
    try {
      await machineController.delete(req, res);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
router.post("/validate", securedMachineWithQueryHasRFID, async(req:Request, res:Response)=>{
  try{
    await inquiryController.validate(req,res);

  }catch(err){
    res.status(400).json({ error: err.message });
  }
})
router.post("/validate", async(req:Request, res:Response)=>{
  try{
    await inquiryController.validateQR(req,res);

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

router.post("/failure", async(req:Request, res:Response)=>{
  try{
    await inquiryController.failure(req,res);

  }catch(err){
    res.status(400).json({ error: err.message });
  }
})
router.get("/motd",async(req:Request, res:Response)=>{
  try{
    await machineController.motd(req,res);

  }catch(err){
    res.status(400).json({ error: err.message });
  }
})
router.post("/alert", securedMachineWithQuery,async(req:Request, res:Response)=>{
  try{
    await alertController.createFromMachine(req,res);

  }catch(err){
    res.status(400).json({ error: err.message });
  }
})