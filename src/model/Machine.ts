import { model, Schema, Model, Document } from "mongoose";
import { Types } from "mongoose";
import { ILayout, ILocation } from "./sharedInterfaces";

export interface IMachine {
  name: string;
  location: ILocation;
  stock: number;
  maxStock: number;
  status: string;
  lastService?: number;
  layout: ILayout;
  user: Types.ObjectId;
  company: Types.ObjectId;
  ipadress?: string;
}

export interface MachineDocument extends IMachine, Document {}
const machineSchema = new Schema(
  {
    name: { type: String, required: true },
    location: {
      street: { type: String, required: true },
      number: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    stock: { type: Number, required: true },
    maxStock: { type: Number, required: true },
    status: { type: String, required: true },
    lastService: { type: Number, required: false },
    layout: {
      title: { type: String, required: true },
      motd: { type: String, required: true },
      errQrNotValid: { type: String, required: true },
      errExceededMaxItems: { type: String, required: true },
      okTakeOutNow: { type: String, required: true },
      okTakeOutSuccessful: { type: String, required: true },
      errGeneralFailure: { type: String, required: true },
    },
    user: { type: Types.ObjectId, required: true, ref:"User" },
    company: { type: Types.ObjectId, required: true ,ref:"Company"},
    ipadress: { type: String },
  },
  { timestamps: true }
);

export const Machine: Model<MachineDocument> = model("Machine", machineSchema);
