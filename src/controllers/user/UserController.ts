import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { Role } from "../../model/Role";
import { IUser, User, UserDocument } from "../../model/User";
import RoleManager from "../../manager/RoleManager";
import { Types } from "mongoose";
import filter from "../../helpers/filter";
import bcrypt from "bcrypt";
import { CompletedInquiry } from "../../model/CompletedInquiry";
import { Alert } from "../../model/Alert";

class UserController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    try {
      const { company } = req.body.user;
      const {
        firstname,
        role,
        lastname,
        msid,
        rfid,
        email,
        password,
        fromCompany,
      } = req.body.qry;
      const userrole = req.body.user.role;

      if (!userrole || !(userrole.permissions.users == "write")) {
        throw new Error("User has no user write rights");
      }

      if (!firstname) throw new Error("firstname not found");
      if (!lastname) throw new Error("lastname not found");
      if (!email) throw new Error("email not found");
      if (!password) throw new Error("password not found");
      if (!role) throw new Error("role not found");
      if (fromCompany && !Types.ObjectId.isValid(fromCompany as string))
        throw new Error("fromCompany is not a valid id");

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const r = await Role.findById(role);
      const maxItems = r.defaultMaxItems;
      if (!maxItems) throw Error("Couldn't find default maxItems");
      const user: IUser = {
        company: fromCompany || company._id,
        firstname,
        lastname,
        email,
        password: hashPassword,
        maxItems, //Get max items from company
        role,
        itemsUsed: 0,
        msid,
        rfid,
      };
      const filteredUser = filter(user);

      const response = await User.create(filteredUser);

      res.json({ _id: response._id });
    } catch (err) {
      throw err;
    }
  }
  public async me(req: Request, res: Response) {
    try {
      const { _id } = req.body.user;
      if (Types.ObjectId.isValid(_id)) {
        const user = await User.findById({ _id: _id }, { password: 0 })
          .populate("role")
          .populate("company");
        res.json(user);
      } else {
        res.status(401).json({ error: "Bad id" });
      }
    } catch (err) {
      throw err;
    }
  }
  public async read(req: Request, res: Response) {
    try {
      const { _id, company } = req.body.user;
      const { id, inquiries, alerts, fromCompany } = req.query;
      const idToFind = id ? id : _id;
      if (fromCompany && !Types.ObjectId.isValid(fromCompany as string))
        throw new Error("fromCompany is not a valid id");
      if (Types.ObjectId.isValid(idToFind)) {
        let user = await User.findById(
          { _id: idToFind, company: fromCompany || company?._id },
          { password: 0 }
        )
          .populate("role")
          .populate("company");
        user = user._doc;
        if (inquiries && user) {
          const inquiries = await this.fetchUserInquiries(idToFind);
          user = { ...user, inquiries };
        }
        if (alerts && user) {
          const alerts = await this.fetchUserAlerts(idToFind);
          if (alerts) {
            user = { ...user, userAlerts: alerts };
          }
          const subscriptions = user.role?.subscriptionOnTags;
          if (subscriptions) {
            const tagAlerts = await this.fetchAlertsWithTags(subscriptions);
            if (tagAlerts) {
              user = { ...user, userAlerts: alerts, tagAlerts: tagAlerts };
            }
          }
        }
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
      firstname,
      role,
      email,
      lastname,
      password,
      maxItems,
      fromCompany,
    } = req.body.qry;
    const userrole = req.body.user.role;
    const uid = req.body?.user?._id;
    const company = req.body?.user?.company?._id;
    if (id != uid && (!userrole || !(userrole.permissions.users == "write"))) {
      throw new Error("User has no user write rights");
    }

    let newMax: any = undefined;
    if (role) {
      const r = await Role.findById(role);
      newMax = r.defaultMaxItems;
    } else if (maxItems) {
      newMax = maxItems;
    }

    const user: IUser = {
      company: fromCompany || company,
      firstname,
      lastname,
      email,
      password,
      maxItems: newMax, //Get max items from company
      role,
      itemsUsed: 0,
    };
    const filteredUser = filter(user);
    const response = await User.updateOne(
      { _id: id, company: fromCompany || company },
      { ...filteredUser }
    );
    let userResponse = await User.findById(
      { _id: id, company: fromCompany || company },
      { password: 0 }
    )
      .populate("role")
      .populate("company");
    res.json(userResponse);
  }
  public async delete(req: Request, res: Response) {
    const { id, fromCompany } = req.body.qry;
    const company = req.body?.user?.company?._id;
    if (!id) throw new Error("No id found");
    if (Types.ObjectId.isValid(id)) {
      const response = await User.findOneAndDelete({
        _id: id,
        company: fromCompany || company,
      });
      res.json(response);
    } else {
      throw new Error("id not valid");
    }
  }

  private async fetchUserInquiries(userId: string) {
    return await CompletedInquiry.find({ user: userId }).sort({
      createdAt: -1,
    });
  }
  private async fetchUserAlerts(userId: string) {
    return await Alert.find({ user: userId }).sort({ createdAt: -1 });
  }
  private async fetchAlertsWithTags(tags: string[]) {
    return await Alert.find({ tag: { $in: tags } }).sort({createdAt:-1});
  }

  public async readAll(req: Request, res: Response) {
    try {
      const { company } = req.body.user;
      const { fromCompany } = req.query;
      if (fromCompany && !Types.ObjectId.isValid(fromCompany as string))
      throw new Error("fromCompany is not a valid id");
      const response = await User.find(
        { company: fromCompany || company._id },
        { password: 0 }
      ).populate({
        path: "role",
        select: "name",
      });
      res.json(response);
    } catch (err) {
      throw err;
    }
  }
}
export const userController = new UserController();
