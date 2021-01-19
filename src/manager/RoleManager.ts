import { IRole, Role, RoleDocument } from "../model/Role";

export default class RoleManager {
  public static instance: RoleManager | null;

  private roles: RoleDocument[];

  constructor() {
    this.roles = [];
    this.retreiveRoles();
  }

  public static get Instance(): RoleManager {
    return this.instance || (this.instance = new this());
  }

  private async retreiveRoles() {
    const response = await Role.find();
    this.roles = response;
  }

  public get Roles(): RoleDocument[] {
    return this.roles;
  }

  public getRoleById(id: string) {
    return this.roles.find((role: RoleDocument) => role._id == id);
  }

  public async newRole(role: IRole) {
    const response = await Role.create(role);
    this.roles.push(response);
    this.retreiveRoles();
    return response;
    //push one to db
  }
  public async removeRoleById(id: string) {
    const response = await Role.findOneAndDelete({ _id: id });
    this.retreiveRoles();
    return response;
  }
  public async editRoleById(id: string, newValue: IRole) {
    const response = await Role.updateOne(
      { _id: id },
      { $set: { ...newValue } }
    );
    return response;
  }
}
