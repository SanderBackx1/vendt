import { model, Schema, Model, Document, Types } from "mongoose";
import { ILayout, ILocation } from "./sharedInterfaces";
import { Role } from "./Role";
import { User } from "./User";
import { Machine } from "./Machine";
export interface ICompany {
  name: string;
  location: ILocation;
  ttl: number;
  layout: ILayout;
  imageURL?: string;
  defaultRole?: Types.ObjectId;
  resetFrequency: string;
  resetStartDate: number;
}

export interface CompanyDocument extends ICompany, Document {}
const companySchema: Schema = new Schema({
  name: { type: String, required: true },
  location: {
    street: { type: String, required: true },
    number: { type: Number, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
    country: { type: String, required: true },
  },
  ttl: { type: Number, required: true },
  layout: {
    title: { type: String, required: true },
    motd: { type: String, required: true },
    errQrNotValid: { type: String, required: true },
    errExceededMaxItems: { type: String, required: true },
    okTakeOutNow: { type: String, required: true },
    okTakeOutSuccessful: { type: String, required: true },
    errGeneralFailure: { type: String, required: true },
  },
  imageURL: { type: String, required: false },
  defaultRole: { type: Types.ObjectId, required: false, ref:"Role" },
  resetFrequency: { type: String, required: true },
  resetStartDate: { type: Number, required: true },
});

companySchema.pre("remove",  async function (next: any) {
  await User.deleteMany({ company: this._id });
  await Role.deleteMany({ company: this._id });
  await Machine.deleteMany({company: this._id});
  next()
});
export const Company: Model<CompanyDocument> = model("Company", companySchema);
