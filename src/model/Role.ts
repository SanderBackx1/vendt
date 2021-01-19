import { model, Schema, Model, Document } from "mongoose";

export type Permission = "read" | "write" | "none";

export interface Permissions {
  users: Permission;
  machines: Permission;
  alerts: Permission;
  global: boolean;
}

export interface Role {
  permissions: Permissions;
  name: string;
  company: string;
}

export interface RoleDocument extends Role, Document {}

const RoleSchema: Schema = new Schema({
  permissions: {
    users: { type: String, required: true },
    machines: { type: String, required: true },
    alerts: { type: String, required: true },
    global: { type: Boolean, default: false },
  },
  maxItems: { type: Number, required: true },
  name: { type: String, required: true },
  company: { type: String, required: true },
});
