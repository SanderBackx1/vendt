import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { Role } from "../../model/Role";
import { IUser, User, UserDocument } from "../../model/User";
import RoleManager from "../../manager/RoleManager";
import { Types } from "mongoose";
import filter from "../../helpers/filter"
import bcrypt from "bcrypt";
import { CompletedInquiry } from "../../model/CompletedInquiry";

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
      } = req.body.qry;

      if (!firstname) throw new Error("firstname not found");
      if (!lastname) throw new Error("lastname not found");
      if (!email) throw new Error("email not found");
      if (!password) throw new Error("password not found");
      if (!role) throw new Error("role not found");

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      const r = await Role.findById(role)
      const maxItems = r.defaultMaxItems;
      if(!maxItems) throw Error("Couldn't find default maxItems")
      const user: IUser = {
        company:company._id,
        firstname,
        lastname,
        email,
        password:hashPassword,
        maxItems, //Get max items from company
        role,
        itemsUsed: 0,
        msid,
        rfid
      };
      const filteredUser = filter(user);

      const response = await User.create(filteredUser)
      
      res.json({_id:response._id});
    } catch (err) {
      throw err;
    }
  }
  public async me(req: Request, res: Response) {
    try {
      const { _id } = req.body.user;
      if (Types.ObjectId.isValid(_id)) {
        const user = await User.findById({ _id: _id }, {password:0}).populate("role").populate("company");
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
      const { _id } = req.body.user;
      const {id, inquiries} = req.query
      const idToFind = id ? id : _id;
      if (Types.ObjectId.isValid(idToFind)) {
        let user = await User.findById({ _id: idToFind }, {password:0}).populate("role").populate("company");
        if(inquiries && user){
          const inquiries = await this.fetchUserInquiries(idToFind);
          user = {...user._doc, inquiries}
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
      company,
      firstname,
      role,
      email,
      lastname,
      password,
      maxItems
    } = req.body.qry;

    let newMax:any = undefined;
    if(role){
      const r = await Role.findById(role)
      newMax = r.defaultMaxItems;
    }else if(maxItems){
      newMax = maxItems;
    }

    const user: IUser = {
      company,
      firstname,
      lastname,
      email,
      password,
      maxItems:newMax, //Get max items from company
      role,
      itemsUsed: 0,
    };
    const filteredUser = filter(user);
    const response = await User.updateOne({ _id: id }, { ...filteredUser });
    res.json(response);
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.body.qry;
    if (!id) throw new Error("No id found");
    if (Types.ObjectId.isValid(id)) {
      const response = await User.findOneAndDelete({ _id: id });
      res.json(response);
    } else {
      throw new Error("id not valid");
    }
  }

  private async fetchUserInquiries(userId:string){
    return await CompletedInquiry.find({user:userId});
  }

  public async readAll(req: Request, res: Response) {
    try {
      const { company } = req.body.user;
      const response = await User.find({ company: company._id }, {password:0}).populate({
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
