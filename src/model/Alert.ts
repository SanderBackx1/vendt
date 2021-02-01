import { model, Schema, Model, Document, Types } from "mongoose";

export interface IAlert {
  msg: string;
  urgency: string;
  user?: string;
  machine?: string;
  tag: string;
}

export interface AlertDocument extends IAlert, Document {}

const AlertSchema: Schema = new Schema(
  {
    msg: { type: String, required: true },
    urgency: { type: String, required: true },
    user: { type: Types.ObjectId, required: false, ref: "User" },
    machine: { type: Types.ObjectId, required: false, ref: "Machine" },
    tag: { type: Array, required: true },
  },
  { timestamps: true }
);

export const Alert: Model<AlertDocument> = model("Alert", AlertSchema);
