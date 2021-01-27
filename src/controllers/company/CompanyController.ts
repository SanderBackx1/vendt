import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { ICompany, Company } from "../../model/Company";
import { isILocation, isILayout } from "../../model/sharedInterfaces";
import filter from "../../helpers/filter";
import { Role, defaultUser, defaultAdmin } from "../../model/Role";
import { roleController } from "../role/RoleController";
class CompanyController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    const {
      name,
      location,
      ttl,
      layout,
      imageURL,
      resetFrequency,
    } = req.body.qry;
    if (!name) throw new Error("name is required");
    if (!location) throw new Error("name is required");
    if (!isILocation(location)) throw new Error("Location is not valid");
    if (!ttl) throw new Error("name is required");
    if (!layout) throw new Error("name is required");
    if (!isILayout(layout)) throw new Error("Layout is not valid");
    if (!resetFrequency) throw new Error("resetFrequency not found");
    const newCompany: ICompany = {
      name,
      location,
      ttl,
      layout,
      resetFrequency: "weekly",
      resetStartDate: new Date().getTime(),
    };

    if (imageURL) newCompany.imageURL = imageURL;

    const response = await Company.create(newCompany);
    const { _id } = response;
    const roleResponseUser = await Role.create({
      ...defaultUser,
      company: _id,
    }); //await roleController.createRole(defaultUser, _id);
    const roleResponseAdmin = await Role.create({
      ...defaultAdmin,
      company: _id,
    });

    const roleId = roleResponseUser._id;
    await Company.updateOne({ _id }, { defaultRole: roleId });

    res.json(response);
  }
  public async read(req: Request, res: Response) {
    const { fromCompany } = req.query;
    const { company } = req.body.user;

    const response = await Company.findOne({ _id: fromCompany || company });
    res.json(response);
  }

  public async update(req: Request, res: Response) {
    const { fromCompany, qry } = req.body;
    const { company, role } = req.body.user;
    const { name, location, ttl, layout } = qry;

    if (fromCompany) {
      if (!role.permissions.global) {
        throw new Error("User is no global admin");
      }
    }

    const previous = await Company.findOne({ _id: fromCompany || company });

    const newCompany: ICompany = {
      name,
      location,
      ttl,
      layout,
      resetFrequency: "weekly",
      resetStartDate: new Date().getTime(),
    };

    const filteredUpdate = filter(newCompany);
    const newLocation = { ...previous.location, ...filteredUpdate.location };
    const newLayout = { ...previous.layout, ...filteredUpdate.layout };
    filteredUpdate.location = newLocation;
    filteredUpdate.layout = newLayout;

    const response = await Company.updateOne(
      { _id: fromCompany || company },
      { ...filteredUpdate }
    );
    res.json(response);
  }
  public async delete(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
}

export const companyController = new CompanyController();
