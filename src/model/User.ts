import { model, Schema, Model, Document } from "mongoose";
export interface IUser {
  firstname: string;
  lastname?: string;
  date_created?: number;
  maxItems: number;
  rfid?: string;
  role: string;
  itemsUsed?: number;
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
  company: { type: String, required: false },
  role: { type: String, required: true },
  maxItems: { type: Number, required: true },
});

export const User: Model<UserDocument> = model("User", UserSchema);
