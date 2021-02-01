import { Request, Response } from "express";
import { CrudController } from "../CrudController";
import { Types } from "mongoose";
import { Alert, IAlert } from "../../model/Alert";
import filter from "../../helpers/filter";
class AlertController extends CrudController {
  constructor() {
    super();
  }
  public async create(req: Request, res: Response) {
    const { qry } = req.body;
    const { msg, urgency, tag, user, machine } = qry;
    let alert: IAlert = {
      msg,
      tag,
      urgency,
    };
    if(req.body?.machineId ||machine  ){
        const machineId = req.body?.machineId ||machine 
        if(!Types.ObjectId.isValid(machineId)) throw new Error("MachineId not valid")
        alert = {...alert, machine:machineId}
    }
    if(user){
        if(!Types.ObjectId.isValid(user)) throw new Error("user not valid")
        alert = {...alert, user:req.body.user._id}
    }
    
    const response = await Alert.create(alert);
    res.json(response)
  }

  public async read(req: Request, res: Response) {
    const {machine, id, user, tag} = req.query

    const query  = {
      machine,
      _id:id,
      user,
      tag,
    }

    const toSearch = filter(query)

    const response = await Alert.find(toSearch);
    res.json(response)


  }
  public async update(req: Request, res: Response) {
    throw new Error("update not yet implemented");
  }
  public async delete(req: Request, res: Response) {
    throw new Error("delete not yet implemented");
  }
}
export const alertController = new AlertController();
