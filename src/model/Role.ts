import { model, Schema, Model, Document } from "mongoose";

export type Permission = "read" | "write" | "none";

export interface IPermissions {
  users: Permission;
  machines: Permission;
  alerts: Permission;
  global: boolean;
}

export function isIPermissions(object: any): object is IPermissions {
  return (
    "users" in object &&
    "machines" in object &&
    "alerts" in object &&
    "global" in object
  );
}
export interface IRole {
  permissions: IPermissions;
  name: string;
  company: string;
  defaultMaxItems: number;
}

export interface RoleDocument extends IRole, Document {}

const RoleSchema: Schema = new Schema({
  permissions: {
    users: { type: String, required: true },
    machines: { type: String, required: true },
    alerts: { type: String, required: true },
    global: { type: Boolean, default: false },
  },
  defaultMaxItems: { type: Number, required: true },
  name: { type: String, required: true },
  company: { type: String, required: true },
});
export const Role: Model<RoleDocument> = model("Role", RoleSchema);
