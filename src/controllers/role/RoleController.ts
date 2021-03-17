import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { Role, IRole, isIPermissions, IPermissions } from "../../model/Role";
import { Types } from "mongoose";
import filter from "../../helpers/filter";

class RoleController extends CrudController {
  constructor() {
    super();
  }

  public async create(req: Request, res: Response) {
    const { qry } = req.body;
    const { company } = req.body.user;
    const {
      name,
      defaultMaxItems,
      permissions,
      subscriptionOnTags,
      fromCompany,
    } = qry;

    if (!name) throw new Error("name is required");
    if (defaultMaxItems == null || defaultMaxItems == undefined)
      throw new Error("defaultMaxItems is required");
    if (!permissions) throw new Error("permissions is required");
    if (!company) throw new Error("company is required");
    if (!subscriptionOnTags) throw new Error("subscriptionOnTags is required");
    if (!isIPermissions(permissions))
      throw new Error("permissions is not valid");
    const role: IRole = {
      company: fromCompany||company,
      defaultMaxItems,
      name,
      permissions,
      subscriptionOnTags,
    };

    const response = await Role.create(role);
    res.json(response);
  }
  public async read(req: Request, res: Response) {
    try {
      const { company } = req.body.user;
      const { id, fromCompany } = req.query;
      if (!id) throw new Error("No id found");
      if (fromCompany && !Types.ObjectId.isValid(fromCompany as string))
        throw new Error("fromCompany is not a valid id");
      if (Types.ObjectId.isValid(id as string)) {
        console.log(company._id);
        const role = await Role.findOne({
          _id: id,
          company: fromCompany || company._id,
        });
        res.json(role);
      } else {
        throw new Error("id is not valid");
      }
    } catch (err) {
      throw err;
    }
  }
  public async update(req: Request, res: Response) {
    const { qry } = req.body;
    const { company } = req.body.user;
    const { id } = qry;
    const {
      name,
      defaultMaxItems,
      permissions,
      subscriptionOnTags,
      fromCompany,
    } = qry;

    if (fromCompany && !Types.ObjectId.isValid(fromCompany as string))
      throw new Error("fromCompany is not a valid id");
    const role: IRole = {
      company: company._id,
      defaultMaxItems,
      name,
      permissions,
      subscriptionOnTags,
    };
    const previous = await Role.findOne({
      _id: id,
      company: fromCompany || company,
    });

    let filteredUpdate = filter(role);
    const newPermissions = {
      ...previous?.permissions,
      ...filteredUpdate.permissions,
    };
    filteredUpdate.permissions = newPermissions;
    const response = await Role.findOneAndUpdate(
      { _id: id, company: fromCompany || company?._id },
      { ...filteredUpdate },
      { new: true, useFindAndModify: false }
    );
    res.json(response);
  }
  public async delete(req: Request, res: Response) {
    const { id, fromCompany } = req.body?.qry;
    const { company } = req.body.user;
    if (!id) throw new Error("No id found");
    if (Types.ObjectId.isValid(id)) {
      const response = await Role.findByIdAndDelete({
        _id: id,
        company: fromCompany || company._id,
      });
      res.json(response);
    } else {
      throw new Error("id is not valid");
    }
  }
  public async readAll(req: Request, res: Response) {
    const { fromCompany } = req.query;
    const { company } = req.body.user;
    if(fromCompany =="all"){
      const response = await Role.find({  });
      res.json(response);
    }
    else{

      const response = await Role.find({ company: fromCompany || company._id });
      res.json(response);
    }
  }
}

export const roleController = new RoleController();
