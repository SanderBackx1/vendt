import { model, Schema, Model, Document } from "mongoose";
interface ILocation {
  street: string;
  number: number;
  city: string;
  zip: number;
  country: string;
}
interface ILayout {
  title: string;
  motd: string;
  errQrNotValid: string;
  errExceededMaxItems: string;
  okTakeOutNow: string;
  okTakeOutSuccessful: string;
  errGeneralFailure: string;
}

export function isILocation(object: any): object is ILocation {
  return (
    "street" in object &&
    "number" in object &&
    "city" in object &&
    "zip" in object &&
    "country" in object
  );
}
export function isILayout(object: any): object is ILayout {
  return (
    "title" in object &&
    "motd" in object &&
    "errQrNotValid" in object &&
    "errExceededMaxItems" in object &&
    "okTakeOutNow" in object &&
    "okTakeOutSuccessful" in object &&
    "errGeneralFailure" in object
  );
}

export interface ICompany {
  name: string;
  location: ILocation;
  ttl: number;
  layout: ILayout;
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
});

export const Company: Model<CompanyDocument> = model("Company", companySchema);
