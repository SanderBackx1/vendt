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
import {
  CompletedInquiry,
  ICompletedInquiry,
} from "../../model/CompletedInquiry";

class InquiryController extends CrudController {
  constructor() {
    super();
  }

  public async validate(req: Request, res: Response) {
    const { machineId, qry } = req.body;
    const { qr } = qry;

    //if ttl not auto-deleting, implement ttl

    const machine: MachineDocument = await Machine.findOne({ _id: machineId });
    if (!machine) throw new Error("machine not found");

    const inquiry = await QRInquiry.findOne({ qrCode: qr }).populate(
      "user"
    );

    if (machine.stock <= 0) {
      const message = MessageGenerator.generate(
        machine.layout.errQrNotValid,
        inquiry.user
      );
      res.json({ status: "error", message });
    } //Send message instead of error


    if (!inquiry) {
      const message = MessageGenerator.generate(
        machine.layout.errQrNotValid,
        inquiry.user
      );
      res.json({ status: "error", message, qrinquiryId: inquiry._id });
    }

    const message = MessageGenerator.generate(
      machine.layout.okTakeOutNow,
      inquiry.user
    );
    res.json({ status: "success", message, qrinquiryId: inquiry._id });
  }

  public async create(req: Request, res: Response) {
    if (!process.env.TOKEN_SECRET) throw new Error("Server error");
    const { user, qry } = req.body;

    if (user.maxItems - (user.itemsUsed || 0) <= 0) {
      throw new Error("User has no more credits");
    }

    const { qr, ttl } = qry;
    if (!qr) throw new Error("no qr code found");
    const {company} = user;
    if (!company && !ttl) throw new Error("Couldn't determine ttl");

    const inquiry: IQRInquiry = {
      qrCode: qr,
      ttl: ttl || company.ttl,
      user: Types.ObjectId.createFromHexString(user.uid),
    };
    const response = await QRInquiry.create(inquiry);
    res.json(response);
  }

  public async success(req:Request, res:Response){
    throw new Error("not implemented yet")
  }
  public async successQR(req: Request, res: Response) {
    const { machineId, qry } = req.body;
    const { qrinquiryId } = qry;

    if (!Types.ObjectId.isValid(machineId))
      throw new Error("machineId not valid");
    if (!Types.ObjectId.isValid(qrinquiryId))
      throw new Error("machineId not valid");

    const inquiry = await QRInquiry.findOne({ _id: qrinquiryId });
    if (!inquiry) throw new Error("inquiry not found");

    const machine = await Machine.findOne({ _id: machineId });
    if (!machine) throw new Error("machine not found");

    const completedInquiry: ICompletedInquiry = {
      amount: 1,
      authType: "qr",
      machine: machineId,
      user: inquiry.user,
      machineName: machine.name,
    };

    const response = await CompletedInquiry.create(completedInquiry);
    if (response?._id) {
      await QRInquiry.deleteOne({ _id: qrinquiryId });
      await Machine.updateOne(
        { _id: machineId },
        {
          stock: machine.stock - completedInquiry.amount,
          lastService: Date.now(),
        }
      );
    }

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
