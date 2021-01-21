import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { isILocation, isILayout, ICompany, Company } from "../../model/Company";
import RoleManager from "../../manager/RoleManager";
import { Types } from "mongoose";
import { User } from "../../model/User";

const roleManager = RoleManager.Instance;
class CompanyController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    const { uid, role, company } = req.body;
    const { name, location, ttl, layout, id, imageURL } = req.body.qry;
    if (!name) throw new Error("name is required");
    if (!location) throw new Error("name is required");
    if (!isILocation(location)) throw new Error("Location is not valid");
    if (!ttl) throw new Error("name is required");
    if (!layout) throw new Error("name is required");
    if (!isILayout(layout)) throw new Error("Layout is not valid");

    if (id) {
      return await this.update(req, res);
    }
    const r = roleManager.getRoleById(
      role || User.findOne({ _id: uid }),
      company
    );
    if (!r || r.permissions.company != "write" || !r.permissions.global) {
      throw new Error("User has insufficient rights");
    }

    const newCompany: ICompany = {
      name,
      location,
      ttl,
      layout,
    };

    if (imageURL) newCompany.imageURL = imageURL;

    const response = await Company.create(newCompany);
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
    const { uid, role, company } = req.body;
    const { name, location, ttl, layout, id } = req.body.qry;

    const newCompany: ICompany = {
      name,
      location,
      ttl,
      layout,
    };
    if (company != id) {
      const r = roleManager.getRoleById(
        role || User.findOne({ _id: uid })?.role,
        company
      );
      if (!r || r.permissions.company != "write" || !r.permissions.global) {
        throw new Error("User has insufficient rights");
      }
    }

    const response = await Company.updateOne({ _id: id }, { ...newCompany });
    res.json(response);
  }
  public async delete(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
}

export const companyController = new CompanyController();
