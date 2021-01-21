import { CrudController } from "../CrudController";
import { Request, Response } from "express";

class MachineController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async read(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async readAll(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async update(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async delete(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
}

export const machineController = new MachineController();
