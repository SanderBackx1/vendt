import { CrudController } from "../CrudController";
import { Request, Response } from "express";
import { isILocation, isILayout } from "../../model/sharedInterfaces";
import { IMachine, Machine } from "../../model/Machine";
import { Company } from "../../model/Company";
import RoleManager from "../../manager/RoleManager";
import { User } from "../../model/User";
import { Types } from "mongoose";
import filter from "../../helpers/filter";

const roleManager = RoleManager.Instance;
class MachineController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    const { company, _id } = req.body.user;
    const {
      name,
      location,
      stock,
      maxStock,
      status,
      lastService,
    } = req.body.qry;
    if (!name) throw new Error("name is required");
    if (!location) throw new Error("location is required");
    if (!isILocation(location)) throw new Error("location is invalid");
    if (!maxStock) throw new Error("maxStock is required");

    const comp = await Company.findOne({ _id: company });
    const { layout } = comp;
    if (!layout) throw new Error("layout is required");
    if (!isILayout(layout)) throw new Error("layout is invalid");

    const newMachine: IMachine = {
      name,
      location,
      stock: stock ? stock : maxStock,
      maxStock,
      status: status ? status : "good",
      layout,
      user: _id,
      company,
    };

    if (lastService) newMachine.lastService = lastService;

    const response = await Machine.create(newMachine);
    res.json(response);
  }
  public async read(req: Request, res: Response) {
    const { fromCompany } = req.body;
    const { company } = req.body.user;
    const { id } = req.body.qry;

    if (!id) throw new Error("id is required");
    const response = await Machine.findOne({
      _id: id,
      company: fromCompany || company,
    });
    res.json(response);
  }
  public async readAll(req: Request, res: Response) {
    const { fromCompany } = req.body;
    const { company } = req.body.user;
    const response = await Machine.find({
      company: fromCompany || company,
    });

    res.json(response);
  }
  public async update(req: Request, res: Response) {
    const { fromCompany, qry } = req.body;
    const { company, _id } = req.body.user;
    const {
      name,
      location,
      stock,
      maxStock,
      status,
      lastService,
      id,
      user,
      layout,
    } = qry;

    const comp = qry?.company
    const previous = await Machine.findOne({
      _id: id,
      company: fromCompany || company._id,
    });
    const update: IMachine = {
      name,
      location,
      stock,
      maxStock,
      status,
      user,
      company:comp?comp:undefined,
      layout,
      lastService,
    };
    let filteredUpdate = filter(update);
    const newLocation = { ...previous.location, ...filteredUpdate.location };
    const newLayout = { ...previous.layout, ...filteredUpdate.layout };
    filteredUpdate.layout = newLayout;
    filteredUpdate.location = newLocation;

    const response = await Machine.updateOne(
      { _id: id, company: fromCompany || company._id },
      { ...filteredUpdate }
    );
    res.json(response);
  }
  public async delete(req: Request, res: Response) {
    const { fromCompany, qry } = req.body;
    const {company} = req.body.user
    const { id } = qry;

    const response = await Machine.deleteOne({
      _id: id,
      company: fromCompany || company,
    });
    res.json(response);
  }
}

export const machineController = new MachineController();
