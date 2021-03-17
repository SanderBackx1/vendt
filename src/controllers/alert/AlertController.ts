import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { Types } from "mongoose";
import { Alert, IAlert } from "../../model/Alert";
import filter from "../../helpers/filter";
import { Machine } from "../../model/Machine";
import { Urgency } from "../../model/sharedInterfaces";
class AlertController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    const { qry } = req.body;
    const company = req.body?.user?.company?._id;
    if (!company) throw new Error("Company not found");
    const { msg, urgency, tag, user, machine, fromCompany } = qry;
    let alert: IAlert = {
      msg,
      tag,
      urgency,
      company: fromCompany ?? company,
    };
    if (
      urgency != "OK" &&
      urgency != "low" &&
      urgency != "medium" &&
      urgency != "high"
    ) {
      throw new Error(
        "Urgency has to be 'OK', 'low', 'medium' or 'high' to be valid"
      );
    }
    if (req.body?.machineId || machine) {
      const machineId = req.body?.machineId || machine;
      if (!Types.ObjectId.isValid(machineId))
        throw new Error("MachineId not valid");
      alert = { ...alert, machine: machineId };

      Machine.findByIdAndUpdate({ _id: machineId }, { status: urgency });
    }
    if (user) {
      if (!Types.ObjectId.isValid(user)) throw new Error("user not valid");
      alert = { ...alert, user };
    }

    const response = await Alert.create(alert);
    res.json(response);
  }

  public async createFromMachine(req: Request, res: Response) {
    const { qry } = req.body;
    const { machineId } = req.body;
    if (!machineId) throw new Error("machineId not found");
    const machine = await Machine.findOne({ _id: machineId });
    if (!machine) throw new Error("machine not found");
    const company = machine.company;
    const { msg, urgency, tag, user } = qry;
    let alert: IAlert = {
      msg,
      tag,
      urgency,
      company,
      machine: machineId,
    };

    if (user) {
      if (!Types.ObjectId.isValid(user)) throw new Error("user not valid");
      alert = { ...alert, user };
    }

    const response = await Alert.create(alert);
    res.json(response);
  }
  public async read(req: Request, res: Response) {
    const { machine, id, user, tag, fromCompany } = req.query;
    const company = req.body?.user?.company?._id;
    const query = {
      machine,
      _id: id,
      user,
      tag,
      company: fromCompany ?? company,
    };

    const toSearch = filter(query);

    const response = await Alert.find(toSearch);

    res.json(response);
  }
  public async tags(req: Request, res: Response) {
    const { user } = req.body;
    const company = user.company._id;
    const { fromCompany } = req.query;

    const alerts = await Alert.find({ company: fromCompany || company });
    let tagSet = new Set();

    alerts.forEach((alert: IAlert) => {
      if (alert.tag) {
        tagSet.add(alert.tag);
      }
    });

    res.json({ tags: [...tagSet] });
  }
  public async update(req: Request, res: Response) {
    const { qry } = req.body;
    const { msg, urgency, tag, user, machine, id, fromCompany } = qry;
    const company = req.body?.user?.company?._id;
    let alert: IAlert = {
      msg,
      tag,
      urgency,
      user,
      machine,
    };

    const update = filter(alert);
    const response = await Alert.findByIdAndUpdate(
      { _id: id, company: fromCompany ?? company },
      { ...update },
      { new: true, useFindAndModify: false }
    );
    res.json(response);
  }
  public async delete(req: Request, res: Response) {
    const { qry } = req.body;
    const company = req.body?.user?.company?._id;
    const { id, fromCompany } = qry;
    const response = await Alert.findOneAndDelete({
      _id: id,
      company: fromCompany ?? company,
    });
    res.json(response);
  }

  public async readAll(req: Request, res: Response) {
    try {
      const { company } = req.body.user;
      const { fromCompany } = req.query;
      if (fromCompany == "all") {
        const response = await Alert.find({});
        res.json(response);
      } else {
        if (fromCompany && !Types.ObjectId.isValid(fromCompany as string))
          throw new Error("fromCompany is not a valid id");
        const response = await Alert.find({
          company: fromCompany || company._id,
        });
        res.json(response);
      }
    } catch (err) {
      throw err;
    }
  }
}
export const alertController = new AlertController();
