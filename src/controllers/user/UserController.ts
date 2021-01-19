import { Request, Response } from "express";
import { CrudController } from "../CrudController";
// import { User } from "../../interfaces/database";
import { IUser, User, UserDocument } from "../../model/User";
import RoleManager from "../../manager/RoleManager";
import { Types } from "mongoose";

// const userManager = UserManager.Instance;
const roleManager = RoleManager.Instance;

class UserController extends CrudController {
  public async create(req: Request, res: Response) {
    try {
      const { company, firstname, role } = req.body;

      if (!company) throw new Error("company not found");
      if (!firstname) throw new Error("firstname not found");
      if (!role) throw new Error("role not found");

      const maxItems = roleManager.getRoleById(role)?.defaultMaxItems;
      const user: IUser = {
        company,
        firstname,
        maxItems: maxItems ? maxItems : 0, //Get max items from company
        role,
        itemsUsed: 0,
      };

      if (req.body.lastname) user.lastname = req.body.lastname;
      if (req.body.msid) user.msid = req.body.msid;
      if (req.body.rfid) user.rfid = req.body.rfid;

      const doc = new User(user);
      const response = await doc.save();
      // const u: UserDocument = await User.create(user);
      console.log("done");
      res.json(response);
    } catch (err) {
      throw err;
    }
  }
  public async read(req: Request, res: Response) {
    try {
      const { uid, id } = req.body;
      const idToFind = id ? id : uid;
      if (Types.ObjectId.isValid(idToFind)) {
        const user = await User.findById({ _id: idToFind });
        res.json(user);
      } else {
        res.status(401).json({ error: "Bad id" });
      }
    } catch (err) {
      throw err;
    }
  }
  public update(req: Request, res: Response) {
    throw new Error("Method not implemented yet");
  }
  public delete(req: Request, res: Response) {
    throw new Error("Method not implemented yet");
  }
  public async readAll(req: Request, res: Response) {
    try {
      const response = await User.find();
      res.json(response);
    } catch (err) {
      throw err;
    }
  }
}
export const userController = new UserController();
