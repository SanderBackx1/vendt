import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { isILocation, isILayout, ICompany, Company } from "../../model/Company";
class CompanyController extends CrudController {
  public async create(req: Request, res: Response) {
    const { name, location, ttl, layout } = req.body.qry;
    if (!name) throw new Error("name is required");
    if (!location) throw new Error("name is required");
    if (!isILocation(location)) throw new Error("Location is not valid");
    if (!ttl) throw new Error("name is required");
    if (!layout) throw new Error("name is required");
    if (!isILayout(layout)) throw new Error("Layout is not valid");

    const company: ICompany = {
      name,
      location,
      ttl,
      layout,
    };
    const response = await Company.create(company);
    res.json(response);
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
