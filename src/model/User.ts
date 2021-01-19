import { model, Schema, Model, Document } from "mongoose";
export interface IUser {
  firstname: string;
  lastname?: string;
  max_items: number;
  date_created?: number;
  date_updated?: number;
  last_login?: number;
  rfid?: string;
  role: string;
  items_used?: number;
  msid?: string;
  company: string;
}

export interface UserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  max_items: { type: Number, required: true },
  rfid: { type: String, required: false },
  items_used: { type: Number, required: false },
  msid: { type: String, required: false },
  company: { type: String, required: false },
  role: { type: String, required: true },
});

export const User: Model<UserDocument> = model("User", UserSchema);
