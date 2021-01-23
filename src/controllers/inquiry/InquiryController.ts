import { CrudController } from "../CrudController";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Company } from "../../model/Company";
import { TokenInterface } from "../../model/sharedInterfaces";
import { IQRInquiry, QRInquiry } from "../../model/QRInquiry";
import { Types } from "mongoose";
import { User } from "../../model/User";
import { Machine, MachineDocument } from "../../model/Machine";
import MessageGenerator from "../../helpers/MessageGenerator";

class InquiryController extends CrudController {
  constructor() {
    super();
  }

  public async validate(req: Request, res: Response) {
    const {machineId, qry} = req.body;
    const {qrcode} = qry;

    //if ttl not auto-deleting, implement ttl
    
    const machine:MachineDocument = await Machine.findOne({_id:machineId})
    if(!machine) throw new Error("machine not found");
    
    const inquiry = await QRInquiry.findOne({qrCode:qrcode}).populate('user');
    
    
    if(machine.stock<=0){
      const message = MessageGenerator.generate(machine.layout.errQrNotValid, inquiry.user)
      res.json({status:"error", message})
    } //Send message instead of error
    
    if(!inquiry){
      const message = MessageGenerator.generate(machine.layout.errQrNotValid, inquiry.user)
      res.json({status:"error", message, qrinquiryId: inquiry._id })
    } 

    const message = MessageGenerator.generate(machine.layout.okTakeOutNow, inquiry.user)
    res.json({status:"success", message, qrinquiryId: inquiry._id })
  }

  public async create(req: Request, res: Response) {
    if (!process.env.TOKEN_SECRET) throw new Error("Server error");
    const { auth, qry } = req.body;
    const user = jwt.verify(auth, process.env.TOKEN_SECRET) as TokenInterface;

    const userDoc = await User.findOne({ _id: user.uid });
    if (userDoc.maxItems - (userDoc.itemsUsed || 0) <= 0) {
      // throw new Error("User has no more credits");
    }
    console.log(userDoc.maxItems - userDoc.itemsUsed);

    const { qr, ttl } = qry;
    if (!qr) throw new Error("no qr code found");
    const company = await Company.findOne({ _id: user.company });
    if (!company && !ttl) throw new Error("Couldn't determine ttl");

    const inquiry: IQRInquiry = {
      qrCode: qr,
      ttl: ttl || company.ttl,
      user: Types.ObjectId.createFromHexString(user.uid),
    };
    const response = await QRInquiry.create(inquiry);
    res.json(response);
  }
  public async read(req: Request, res: Response) {
    throw new Error("not implemented yet");
  }

  public async readAll(req: Request, res: Response) {
    throw new Error("not implemented yet");
  }

  public async update(req: Request, res: Response) {
    throw new Error("not implemented yet");
  }
  public async delete(req: Request, res: Response) {
    throw new Error("not implemented yet");
  }
}

export const inquiryController = new InquiryController();
