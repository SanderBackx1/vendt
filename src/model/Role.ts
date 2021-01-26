import { model, Schema, Model, Document, Types } from "mongoose";

export type Permission = "read" | "write" | "none";

export interface IPermissions {
  users: Permission;
  machines: Permission;
  alerts: Permission;
  company: Permission;
  inquiry: Permission;
  global: boolean;
}

export function isIPermissions(object: any): object is IPermissions {
  return (
    "users" in object &&
    "machines" in object &&
    "alerts" in object &&
    "global" in object &&
    "company" in object &&
    "inquiry" in object
  );
}
export interface IRole {
  permissions: IPermissions;
  name: string;
  company: string;
  defaultMaxItems: number;
  subscriptionOnTags: string[];
}

export interface RoleDocument extends IRole, Document {}

const RoleSchema: Schema = new Schema({
  permissions: {
    users: { type: String, required: true },
    machines: { type: String, required: true },
    alerts: { type: String, required: true },
    company: { type: String, required: true },
    inquiry: { type: String, required: true },
    global: { type: Boolean, default: false },
  },
  defaultMaxItems: { type: Number, required: true },
  name: { type: String, required: true },
  company: { type: Types.ObjectId, required: true, ref: "Company" },
  subscriptionOnTags: { type: [String], required: true },
}, {timestamps:true});

export const defaultUser = {
  name: "user",
  defaultMaxItems: 0,
  permissions: {
    alerts: "none",
    company: "none",
    inquiry: "none",
    machines: "none",
    users: "none",
    global: false,
  },
  subscriptionOnTags: [],
};
export const defaultAdmin = {
  name: "admin",
  defaultMaxItems: 0,
  permissions: {
    alerts: "write",
    company: "write",
    inquiry: "write",
    machines: "write",
    users: "write",
    global: false,
  },
  subscriptionOnTags: [],
};
export const Role: Model<RoleDocument> = model("Role", RoleSchema);
