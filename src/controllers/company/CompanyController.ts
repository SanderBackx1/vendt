import { Request, Response } from "express";
import { CrudController } from "../CrudController";

class CompanyController extends CrudController {
  public async create(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async read(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async update(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async delete(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
}

export const companyController = new CompanyController();
