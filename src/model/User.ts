import { model, Schema, Model, Document, Types } from "mongoose";
import { QRInquiry } from "./QRInquiry";
export interface IUser {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  date_created?: number;
  maxItems: number;
  rfid?: string;
  role: Types.ObjectId;
  itemsUsed: number;
  msid?: string;
  company: string;
}

export interface UserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  rfid: { type: String, required: false },
  itemsUsed: { type: Number, required: false },
  msid: { type: String, required: false },
  company: { type: Types.ObjectId, required: false, ref: "Company" },
  role: { type: Types.ObjectId, required: true, ref: "Role" },
  maxItems: { type: Number, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
}, {timestamps:true});
UserSchema.pre("remove", async function (next) {
  await QRInquiry.deleteMany({ user: this._id });
  next;
});

export const User: Model<UserDocument> = model("User", UserSchema);
