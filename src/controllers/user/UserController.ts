import { Request, Response } from "express";
import { CrudController } from "../CrudController";
// import { User } from "../../interfaces/database";
import { IUser, User, UserDocument } from "../../model/User";
import RoleManager from "../../manager/RoleManager";
import { Types } from "mongoose";

// const userManager = UserManager.Instance;
const roleManager = RoleManager.Instance;

class UserController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    try {
      const { company } = req.body;
      const {
        firstname,
        role,
        id,
        lastname,
        msid,
        rfid,
        email,
        password,
      } = req.body.qry;

      if (!firstname) throw new Error("firstname not found");
      if (!role) throw new Error("role not found");

      if (id) {
        return await this.update(req, res);
      }

      const maxItems = roleManager.getRoleById(role, company)?.defaultMaxItems;
      const user: IUser = {
        company,
        firstname,
        lastname,
        email,
        password,
        maxItems: maxItems ? maxItems : 0, //Get max items from company
        role,
        itemsUsed: 0,
      };

      if (lastname) user.lastname = lastname;
      if (msid) user.msid = msid;
      if (rfid) user.rfid = rfid;

      const doc = new User(user);
      const response = await doc.save();
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
  public async update(req: Request, res: Response) {
    const {
      id,
      company,
      firstname,
      role,
      email,
      lastname,
      password,
    } = req.body;
    const maxItems = roleManager.getRoleById(role, company)?.defaultMaxItems;
    const user: IUser = {
      company,
      firstname,
      lastname,
      email,
      password,
      maxItems: maxItems ? maxItems : 0, //Get max items from company
      role,
      itemsUsed: 0,
    };

    if (req.body.lastname) user.lastname = req.body.lastname;
    if (req.body.msid) user.msid = req.body.msid;
    if (req.body.rfid) user.rfid = req.body.rfid;
    const response = await User.updateOne({ _id: id }, { ...user });
    res.json(response);
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) throw new Error("No id found");
    if (Types.ObjectId.isValid(id)) {
      const response = await User.findOneAndDelete({ _id: id });
      res.json(response);
    } else {
      throw new Error("id not valid");
    }
  }

  public async readAll(req: Request, res: Response) {
    try {
      const {company} = req.body.user
      const response = await User.find({company:company._id}).populate({path:'role', select:'name'});
      res.json(response);
    } catch (err) {
      throw err;
    }
  }
}
export const userController = new UserController();
