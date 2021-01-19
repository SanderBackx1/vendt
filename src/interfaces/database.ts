export interface User {
  id: string;
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

export type Permission = "read" | "write" | "none";

export interface Permissions {
  users: Permission;
  machines: Permission;
  alerts: Permission;
  global: boolean;
}

export interface Role {
  id: string;
  permissions: Permissions;
  name: string;
  company: string;
}
