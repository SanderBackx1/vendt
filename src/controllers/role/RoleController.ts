import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { IUser, User, UserDocument } from "../../model/User";
import RoleManager from "../../manager/RoleManager";
import { Role } from "../../model/Role";
import { Types } from "mongoose";

const roleManager = RoleManager.Instance;

class RoleController extends CrudController {
  public async create(req: Request, res: Response) {
    throw new Error("Not yet implemented");
  }
  public async read(req: Request, res: Response) {
    try {
      const id = req.body;
      if (!id) throw new Error("No id found");
      if (!Types.ObjectId.isValid(id)) throw new Error("id is not valid");
      const role = roleManager.getRoleById(id);
      res.json(role);
    } catch (err) {
      throw err;
    }
    // throw new Error("Not yet implemented");
  }
  public async update(req: Request, res: Response) {
    throw new Error("Not yet implemented");
  }
  public async delete(req: Request, res: Response) {
    throw new Error("Not yet implemented");
  }
}

export const roleController = new RoleController();
