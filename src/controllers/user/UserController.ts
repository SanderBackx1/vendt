import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { UserManager } from "../../managers/userManager";
// import { User } from "../../interfaces/database";
import { IUser, User, UserDocument } from "../../model/User";

const userManager = UserManager.Instance;

class UserController extends CrudController {
  public async create(req: Request, res: Response) {
    const { company, firstname, role } = req.body;

    if (!company) throw new Error("company not found");
    if (!firstname) throw new Error("firstname not found");
    if (!role) throw new Error("role not found");

    const user: IUser = {
      // id: `randomid${Math.round(Math.random() * 200)}`,
      company,
      firstname,
      max_items: 20, //Get max items from company
      role,
      date_created: new Date().getTime(),
      date_updated: new Date().getTime(),
      items_used: 0,
      // lastname
      //  msid
      // rfid
    };

    if (req.body.lastname) user.lastname = req.body.lastname;
    if (req.body.msid) user.msid = req.body.msid;
    if (req.body.rfid) user.rfid = req.body.rfid;

    // userManager.addUser(user);

    const doc = new User(user);
    const response = await doc.save();
    // const u: UserDocument = await User.create(user);

    console.log("done");
    res.json(response);

    // throw new Error("Method not implemented yet");
  }
  public read(req: Request, res: Response) {
    const { uid, id } = req.body;

    const idToFind = id ? id : uid;

    const user = User.findById(idToFind);

    res.json(user);
  }
  public update(req: Request, res: Response) {
    throw new Error("Method not implemented yet");
  }
  public delete(req: Request, res: Response) {
    throw new Error("Method not implemented yet");
  }
  public readAll(req: Request, res: Response) {
    const users = userManager.getAll();
    res.json(users);
  }
}
export const userController = new UserController();
