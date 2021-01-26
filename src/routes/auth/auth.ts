import { Router, Request, Response, response } from "express";
import { User, IUser } from "../../model/User";
import bcrypt from "bcrypt";
import jsw from "jsonwebtoken";
import { Role } from "../../model/Role";
import { Company, CompanyDocument } from "../../model/Company";
import RoleManager from "../../manager/RoleManager";
import { Types } from "mongoose";
import { registerValidation, loginValidation } from "./validation";

export const router = Router();
const roleManager = RoleManager.Instance;

router.post("/register", async (req: Request, res: Response) => {
  try {
    //VALIDATE
    const { company, qry } = req.body;
    const { email, password, firstname, lastname } = qry;
    const {error} = registerValidation(qry)
    if(error) throw new Error(error.details[0].message)

    const exists = await User.findOne({ email });
    if (exists) throw new Error("User already exists");
    const comp = await Company.findOne({
      _id: company,
    }).populate("defaultRole");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const defaultRole = comp.defaultRole;
    if (!defaultRole) throw new Error("no default role found");

    const user: IUser = {
      company,
      password: hashPassword,
      email,
      firstname,
      lastname,
      maxItems: defaultRole.defaultMaxItems,
      role: defaultRole,
      date_created: new Date().getTime(),
    };

    const response = await User.create(user);
    res.send({ user: response?._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { company, qry } = req.body;
    const { email, password } = qry;
    const {error} = loginValidation(qry)
    if(error) throw new Error(error.details[0].message)

    const user = await User.findOne({ email: email as string, company });
    if (!user) throw new Error("User not found");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) throw new Error("Password invalid");

    if (process.env.TOKEN_SECRET) {
      const token = jsw.sign(
        { uid: user._id, company },
        process.env.TOKEN_SECRET
      );
      res.json({ token });
    } else {
      res.json({ user });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});
