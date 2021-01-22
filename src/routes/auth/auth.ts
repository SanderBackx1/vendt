import { Router, Request, Response, response } from "express";
import { User, IUser } from "../../model/User";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Role } from "../../model/Role";

export const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  //VALIDATE
  const { company, qry } = req.body;
  const { email, password, firstname, lastname, role } = qry;
  //CHECK IF EXISTS
  const exists = await User.findOne({ firstname });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const { defaultMaxItems } = await Role.findOne({ _id: role, company });
  console.log(hashPassword);
  console.log(defaultMaxItems);
  const user: IUser = {
    company,
    firstname,
    lastname,
    role,
    maxItems: defaultMaxItems,
    date_created: new Date().getTime(),
  };

  try {
    const response = await User.create(user);
    res.send({ user: response?._id });
  } catch (err) {
    res.status(500).send(err);
  }
});
