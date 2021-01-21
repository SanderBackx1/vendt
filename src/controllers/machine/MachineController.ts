import { CrudController } from "../CrudController";
import { Request, Response } from "express";
import { isILocation, isILayout } from "../../model/sharedInterfaces";
import { IMachine, Machine } from "../../model/Machine";
import { Company } from "../../model/Company";
import RoleManager from "../../manager/RoleManager";
import { User } from "../../model/User";

const roleManager = RoleManager.Instance;
class MachineController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    const { uid, company } = req.body;
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
      user: uid,
      company,
    };
    if (lastService) newMachine.lastService = lastService;

    const response = await Machine.create(newMachine);
    res.json(response);
  }
  public async read(req: Request, res: Response) {
    const { uid, company, role } = req.body;
    const { id, fromCompany } = req.body.qry;

    if (!id) throw new Error("id is required");
    if (fromCompany) {
      const r = roleManager.getRoleById(
        role || (await User.findOne({ _id: uid }).role),
        company
      );
      if (
        !r ||
        !(
          r.permissions.machines == "read" || r.permissions.machines == "write"
        ) ||
        !r.permissions.global
      ) {
        throw new Error("User has insufficient rights");
      }
    }
    const response = await Machine.findOne({
      _id: id,
      company: fromCompany || company,
    });
    res.json(response);
  }
  public async readAll(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async update(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
  public async delete(req: Request, res: Response) {
    throw new Error("Not implemented yet");
  }
}

export const machineController = new MachineController();
