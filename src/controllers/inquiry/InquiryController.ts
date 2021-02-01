import { CrudController } from "../CrudController";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Company } from "../../model/Company";
import { TokenInterface } from "../../model/sharedInterfaces";
import { IQRInquiry, QRInquiry } from "../../model/QRInquiry";
import { Types } from "mongoose";
import { User, IUser } from "../../model/User";
import { Machine, MachineDocument } from "../../model/Machine";
import MessageGenerator from "../../helpers/MessageGenerator";
import {
  CompletedInquiry,
  ICompletedInquiry,
} from "../../model/CompletedInquiry";
import crypto from 'crypto'
class InquiryController extends CrudController {
  constructor() {
    super();
  }

  public async validate(req: Request, res: Response) {
    const { machineId, qry } = req.body;
    const { rfid } = qry;

    if (!Types.ObjectId.isValid(machineId))
      throw new Error("machineId not valid");
    const machine = await Machine.findOne({ _id: machineId });
    if (!machine) throw new Error("machine not found");

    const user: IUser = await User.findOne({ rfid, company: machine.company });
    console.log(machine.company);
    console.log(user);
    if (!user) throw new Error("User not found");

    if (machine.stock <= 0) {
      const message = MessageGenerator.generate(
        machine.layout.errExceededMaxItems,
        user
      );
      return res.json({ status: "error", message });
    } //Send message instead of error

    if (user.maxItems - (user.itemsUsed ?? 0) <= 0) {
      const message = MessageGenerator.generate(
        machine.layout.errExceededMaxItems,
        user
      );
      return res.json({ status: "error", message });
    }

    const message = MessageGenerator.generate(
      machine.layout.okTakeOutNow,
      user
    );
    res.json({ status: "success", message, rfid });
  }

  public async validateQR(req: Request, res: Response) {
    const { machineId, qry } = req.body;
    const { qr } = qry;

    //if ttl not auto-deleting, implement ttl

    const machine: MachineDocument = await Machine.findOne({ _id: machineId });
    if (!machine) throw new Error("machine not found");
    console.log(qr)
    const inquiry = await QRInquiry.findOne({ qrCode: qr }).populate("user");
    if (!inquiry) {
      return res.json({
        status: "error",
        message: machine.layout.errQrNotValid,
      });
    }
    if (machine.stock <= 0) {
      const message = MessageGenerator.generate(
        machine.layout.errQrNotValid,
        inquiry.user
      );
      return res.json({ status: "error", message });
    } //Send message instead of error

    const message = MessageGenerator.generate(
      machine.layout.okTakeOutNow,
      inquiry.user
    );
    res.json({ status: "success", message, qrinquiryId: inquiry._id });
  }

  public async create(req: Request, res: Response) {
    if (!process.env.TOKEN_SECRET) throw new Error("Server error");
    const { user } = req.body;

    if (user.maxItems - (user.itemsUsed ?? 0) <= 0) {
      throw new Error("User has no more credits");
    }
    let qr = '';
    let ttl = 0;
    if(req.body?.qry){
      qr = req.body.qry.qr
      ttl = req.body.qry.ttl
    }
    const { company } = user;
    if (!company && !ttl) throw new Error("Couldn't determine ttl");

    const serverQr = crypto.randomBytes(5).toString('hex');

    const inquiry: IQRInquiry = {
      qrCode: qr||serverQr,
      ttl:ttl || company.ttl,
      user: user._id,
    };
    const response = await QRInquiry.create(inquiry);
    res.json(response);
  }

  public async success(req: Request, res: Response) {
    const { machineId } = req.body;
    const { rfid } = req.body.qry;
    if (!rfid) throw new Error("no rfid found");

    if (!Types.ObjectId.isValid(machineId))
      throw new Error("machineId not valid");
    const machine = await Machine.findOne({ _id: machineId });
    if (!machine) throw new Error("machine not found");

    const user = await User.findOne({ rfid, company: machine.company });
    if (!user) throw new Error("No user found");

    const completedInquiry: ICompletedInquiry = {
      amount: 1,
      authType: "rfid",
      machine: machineId,
      user: user._id,
      machineName: machine.name,
    };
    const response = await CompletedInquiry.create(completedInquiry);
    if (response?._id) {
      await Machine.updateOne(
        { _id: machineId },
        {
          stock: machine.stock - completedInquiry.amount,
          lastService: Date.now(),
        }
      );
      const newUsed = user.itemsUsed?user.itemsUsed +=1:1;
      await User.updateOne({
        _id:user._id,

      },{itemsUsed:newUsed})
    }

    res.json(response);
  }
  public async successQR(req: Request, res: Response) {
    const { machineId, qry } = req.body;
    const { qrinquiryId } = qry;

    if (!Types.ObjectId.isValid(machineId))
      throw new Error("machineId not valid");
    if (!Types.ObjectId.isValid(qrinquiryId))
      throw new Error("machineId not valid");

    const inquiry = await QRInquiry.findOne({ _id: qrinquiryId }).populate("user");;
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

    const message = MessageGenerator.generate(
      machine.layout.okTakeOutSuccessful,
      inquiry.user
    );

    res.json({status:'success', message});
  }

  public async failure(req: Request, res: Response) {
    const { machineId } = req.body;
    const { failure, qrinquiryId } = req.body.qry;

    if (!Types.ObjectId.isValid(machineId))
      throw new Error("machineId not valid");
    const machine = await Machine.findOne({ _id: machineId });
    if (!machine) throw new Error("machine not found");

    //Create Alert

    res.json({ status: "success" });
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
