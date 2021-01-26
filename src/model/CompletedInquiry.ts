import { model, Schema, Model, Document, Types } from "mongoose";

export interface ICompletedInquiry {
  amount: number;
  authType: string;
  machineName: string;
  machine: string;
  user: string;
}

export interface CompletedInquiryDocument extends ICompletedInquiry, Document {}

const CompletedInquirySchema: Schema = new Schema({
  amount: { type: Number, required: true },
  authType: { type: String, required: true },
  user: { type: Types.ObjectId, required: true, ref: "User" },
  machineName: { type: String, required: true },
  machine: { type: Types.ObjectId, required: true, ref: "Machine" },
}, {timestamps:true});
export const CompletedInquiry: Model<CompletedInquiryDocument> = model(
  "CompletedInquiry",
  CompletedInquirySchema
);
