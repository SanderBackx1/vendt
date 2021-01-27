import express, { Router } from "express";
import dotenv from "dotenv";
import { router, helloworldrouter } from "./routes";
import mongoose from "mongoose";

import cors from 'cors'


const app = express();
const PORT = 8080;

dotenv.config();
let connection = false;
if (process.env.DB_CONNECT) {
  mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    () => {
      connection = true;
      console.log("connected to db");
    }
  );
}

const connectionRouter = express.Router();
connectionRouter.get("/", (req: any, res: any) => {
  res.json({ connection });
});

app.use(cors())
app.use(express.json());
app.use("/api", router);
app.use("/", helloworldrouter);
app.use("/connection", connectionRouter);
app.listen(PORT, () => console.log("server running"));
