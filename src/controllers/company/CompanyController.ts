import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { isILocation, isILayout, ICompany, Company } from "../../model/Company";
import RoleManager from "../../manager/RoleManager";
import { Types } from "mongoose";
import { User } from "../../model/User";

const roleManager = RoleManager.Instance;
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
    const { uid, company } = req.body;
    const { id } = req.body.qry;

    if (!id) throw new Error("id is required");
    if (!Types.ObjectId.isValid(id)) throw new Error("id is not valid");
    if (id != company) {
      const role = roleManager.getRoleById(
        req.body.role || User.findOne({ _id: uid }).role,
        company
      );
      if (
        role &&
        (role.permissions.company == "read" ||
          role.permissions.company == "write") &&
        role.permissions.global
      ) {
        const response = await Company.findOne({ _id: id });
        res.json(response);
      } else {
        throw new Error("User has insufficient rights to view another company");
      }
    } else {
      const response = await Company.findOne({ _id: id });
      res.json(response);
    }
  }
  public async update(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async delete(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
}

export const companyController = new CompanyController();
