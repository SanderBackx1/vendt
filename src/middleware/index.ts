import express, { NextFunction, Request, Response } from "express";
// import { User, Role } from "../interfaces/database";
import { IUser, User, UserDocument } from "../model/User";

// //TEMP TEST USER
// const user1: User = {
//   company: "1",
//   firstname: "Jef",
//   id: "1",
//   max_items: 20,
//   role: "1",
// };
// const user2: User = {
//   company: "1",
//   firstname: "Jos",
//   id: "2",
//   max_items: 20,
//   role: "2",
// };
// const users = [user1, user2];

// //TEMP TEST ROLE
// const role1: Role = {
//   company: "1",
//   id: "1",
//   name: "bigboi",
//   permissions: {
//     alerts: "write",
//     machines: "write",
//     users: "write",
//     global: false,
//   },
// };
// const role2: Role = {
//   company: "1",
//   id: "2",
//   name: "dombo",
//   permissions: {
//     alerts: "read",
//     machines: "read",
//     users: "none",
//     global: false,
//   },
// };
// const roles = [role1, role2];

export const writeUsers = (req: Request, res: Response, next: NextFunction) => {
  const { uid } = req.body;
  try {
    if (!uid) {
      throw new Error("No uid");
    }

    // const user = users.find((user: User) => user.id == uid);
    const user = User.findById(uid);
    console.log(user);
    if (!user) {
      throw new Error("Uid not found");
    }
    //find user in db
    // const role = roles.find((role: Role) => user.role == role.id);]c
    // if (role && role.permissions.users == "write") {
    //   next();
    // } else {
    //   throw new Error("User has no access");
    // }
    // //this is placeholder
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export const readUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uid } = req.body;
  try {
    if (!uid) {
      throw new Error("No uid");
    }

    const user = await User.findById(uid);
    console.log(user);

    if (!user) {
      throw new Error("Uid not found");
    }

    // FIND ROLE IN DB
    // const role = roles.find((role: Role) => user.role == role.id);

    // if (
    //   role &&
    //   (role.permissions.users == "read" || role.permissions.users == "write")
    // ) {
    //   next();
    // } else {
    //   throw new Error("User has no access");
    // }
    //this is placeholder
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
