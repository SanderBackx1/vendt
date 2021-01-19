import { Role } from "../model/Role";

export default class RoleManager {
  public static instance: RoleManager | null;

  private roles: Role[];

  constructor() {
    this.roles = [];
  }

  public static get Instance(): RoleManager {
    return this.instance || (this.instance = new this());
  }
}
