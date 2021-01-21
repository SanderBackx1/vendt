import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import RoleManager from "../../manager/RoleManager";
import { Role, IRole, isIPermissions } from "../../model/Role";
import { Types } from "mongoose";
import filter from "../../helpers/filter";

const roleManager = RoleManager.Instance;

class RoleController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    const { fromCompany, qry } = req.body;
    const {
      name,
      defaultMaxItems,
      company,
      permissions,
      subscriptionOnTags,
    } = qry;

    if (!name) throw new Error("name is required");
    if (!defaultMaxItems) throw new Error("defaultMaxItems is required");
    if (!permissions) throw new Error("permissions is required");
    if (!company) throw new Error("company is required");
    if (!subscriptionOnTags) throw new Error("subscriptionOnTags is required");
    if (!isIPermissions(permissions))
      throw new Error("permissions is not valid");

    const role: IRole = {
      company: fromCompany || company,
      defaultMaxItems,
      name,
      permissions,
      subscriptionOnTags,
    };
    const response = await roleManager.newRole(role);
    res.json(response);
    // throw new Error("Not yet implemented");
  }
  public async read(req: Request, res: Response) {
    try {
      console.log(req.body.role);
      const { company, fromCompany } = req.body;
      const { id } = req.body.qry;
      if (!id) throw new Error("No id found");
      if (Types.ObjectId.isValid(id)) {
        const role = roleManager.getRoleById(id, fromCompany || company);
        res.json(role);
      } else {
        throw new Error("id is not valid");
      }
    } catch (err) {
      throw err;
    }
    // throw new Error("Not yet implemented");
  }
  public async update(req: Request, res: Response) {
    const { company, fromCompany, qry } = req.body;
    const { id } = qry;
    const { name, defaultMaxItems, permissions, subscriptionOnTags } = qry;

    const role: IRole = {
      company,
      defaultMaxItems,
      name,
      permissions,
      subscriptionOnTags,
    };

    const previous = roleManager.getRoleById(id, fromCompany || company);

    let filteredUpdate = filter(role);
    const newPermissions = {
      ...previous?.permissions,
      ...filteredUpdate.permissions,
    };
    filteredUpdate.permissions = newPermissions;

    const response = await roleManager.editRoleById(
      id,
      fromCompany || company,
      filteredUpdate
    );
    res.json(response);
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) throw new Error("No id found");
    if (Types.ObjectId.isValid(id)) {
      const response = await roleManager.removeRoleById(id);
      res.json(response);
    } else {
      throw new Error("id is not valid");
    }
  }
  public async readAll(req: Request, res: Response) {
    const response = await roleManager.getAll();
    res.json(response);
  }
}

export const roleController = new RoleController();
