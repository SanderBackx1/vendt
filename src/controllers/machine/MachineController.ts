import { CrudController } from "../CrudController";
import { Request, Response } from "express";
import { isILocation, isILayout } from "../../model/sharedInterfaces";
import { IMachine, Machine } from "../../model/Machine";
import { Company } from "../../model/Company";
import { Types } from "mongoose";
import filter from "../../helpers/filter";
import { CompletedInquiry } from "../../model/CompletedInquiry";
import { Alert } from "../../model/Alert";

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
      fromCompany,
    } = req.body.qry;
    if (!name) throw new Error("name is required");
    if (!location) throw new Error("location is required");
    if (!isILocation(location)) throw new Error("location is invalid");
    if (!maxStock) throw new Error("maxStock is required");
    if (fromCompany && !Types.ObjectId.isValid(fromCompany))
      throw new Error("fromCompany is not a validID");
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
      company: fromCompany || company,
    };

    if (lastService) newMachine.lastService = lastService;

    const response = await Machine.create(newMachine);
    res.json(response);
  }
  public async read(req: Request, res: Response) {
    const { fromCompany } = req.body;
    const { company } = req.body.user;
    const { id, inquiries, alerts } = req.query;

    if (fromCompany && !Types.ObjectId.isValid(fromCompany))
      throw new Error("fromCompany is not a validID");

    if (!id) throw new Error("id is required");
    let response = await Machine.findOne({
      _id: id,
      company: fromCompany || company,
    })
      .populate("user", { password: 0 })
      .populate("company");
    response = response._doc;

    if (inquiries && response) {
      const inquiries = await this.fetchMachineInquiries(id as string);
      response = { ...response, inquiries };
    }
    if (alerts && response) {
      const alerts = await this.fetchMachineAlerts(id as string);
      response = { ...response, alerts };
    }

    if (!response) throw new Error("machine not found");
    res.json(response);
  }
  public async readAll(req: Request, res: Response) {
    const { fromCompany } = req.query;
    const { company } = req.body.user;
    if (fromCompany && !Types.ObjectId.isValid(fromCompany as string))
      throw new Error("fromCompany is not a validID");
    const response = await Machine.find({
      company: fromCompany || company,
    });

    res.json(response);
  }
  public async update(req: Request, res: Response) {
    const { qry } = req.body;
    const { company } = req.body.user;
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
      fromCompany,
    } = qry;

    const comp = qry?.company;
    if (fromCompany && !Types.ObjectId.isValid(fromCompany as string))
      throw new Error("fromCompany is not a validID");

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
      company: comp ? comp : undefined,
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
    const { qry } = req.body;
    const { company } = req.body.user;
    const { fromCompany, id } = qry;

    if (fromCompany && !Types.ObjectId.isValid(fromCompany as string))
      throw new Error("fromCompany is not a validID");

    const response = await Machine.deleteOne({
      _id: id,
      company: fromCompany || company,
    });
    res.json(response);
  }
  private async fetchMachineInquiries(machineId: string) {
    return await CompletedInquiry.find({ machine: machineId })
      .populate({ path: "user", select: "firstname lastname email" })
      .sort({ createdAt: -1 });
  }
  private async fetchMachineAlerts(machineId: string) {
    return await Alert.find({ machine: machineId }).sort({ createdAt: -1 });
  }
  public async motd(req: Request, res: Response) {
    const { machineId } = req.query;
    const response = await Machine.findOne({
      _id: machineId,
    });
    const { layout } = response;
    if (!layout) throw new Error("no layout found");
    const { motd } = layout;
    if (!motd) throw new Error("no motd found");

    res.json({ status: "success", message: motd });
  }
}
export const machineController = new MachineController();
