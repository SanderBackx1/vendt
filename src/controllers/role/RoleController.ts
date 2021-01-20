import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import RoleManager from "../../manager/RoleManager";
import { Role, IRole, isIPermissions } from "../../model/Role";
import { Types } from "mongoose";

const roleManager = RoleManager.Instance;

class RoleController extends CrudController {
  public async create(req: Request, res: Response) {
    if (req.body.id) {
      this.update(req, res);
    } else {
      const { name, defaultMaxItems, company, permissions } = req.body;
      if (!name) throw new Error("name is required");
      if (!defaultMaxItems) throw new Error("defaultMaxItems is required");
      if (!permissions) throw new Error("permissions is required");
      if (!company) throw new Error("company is required");
      if (!isIPermissions(permissions))
        throw new Error("permissions is not valid");

      const role: IRole = {
        company,
        defaultMaxItems,
        name,
        permissions,
      };
      const response = await roleManager.newRole(role);
      res.json(response);
    }
    // throw new Error("Not yet implemented");
  }
  public async read(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) throw new Error("No id found");
      if (Types.ObjectId.isValid(id)) {
        const role = roleManager.getRoleById(id);
        console.log(role);
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
    const { id } = req.body;
    if (Types.ObjectId.isValid(id)) {
      const { name, defaultMaxItems, company, permissions } = req.body;
      const role: IRole = {
        company,
        defaultMaxItems,
        name,
        permissions,
      };
      const response = await roleManager.editRoleById(id, role);
      res.json(response);
    } else {
      throw new Error("id is not valid");
    }
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
