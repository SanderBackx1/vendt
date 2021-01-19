import { User, Role } from "../interfaces/database";
export class UserManager {
  private static _instance: UserManager | null;
  users: User[];
  roles: Role[];

  constructor() {
    const user1: User = {
      company: "1",
      firstname: "Jef",
      id: "1",
      max_items: 20,
      role: "1",
    };
    const user2: User = {
      company: "1",
      firstname: "Jos",
      id: "2",
      max_items: 20,
      role: "2",
    };
    const role1: Role = {
      company: "1",
      id: "1",
      name: "bigboi",
      permissions: {
        alerts: "write",
        machines: "write",
        users: "write",
        global: false,
      },
    };
    const role2: Role = {
      company: "1",
      id: "2",
      name: "dombo",
      permissions: {
        alerts: "read",
        machines: "read",
        users: "none",
        global: false,
      },
    };

    this.users = [user1, user2];
    this.roles = [role1, role2];
  }

  public addUser(user: User) {
    this.users.push(user);
  }
  public deleteUser(uid: string) {
    const idx = this.users.findIndex((user: User) => user.id == uid);
    this.users.splice(idx, 1);
  }

  public getUser(uid: string) {
    return this.users.find((user: User) => user.id == uid);
  }
  public getAll() {
    return this.users;
  }

  public static get Instance(): UserManager {
    return this._instance || (this._instance = new this());
  }
}
