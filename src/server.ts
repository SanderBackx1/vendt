import express, { Router } from "express";
import dotenv from "dotenv";
import { router, helloworldrouter } from "./routes";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

dotenv.config();
let connection = false;
if (process.env.DB_CONNECT) {
  mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
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
connectionRouter.get("/dotenv", (req: any, res: any) => {
  if(process.env){
    res.json({ exists:true, env:process.env });
  }else{
    res.json({ exists:false });
  }
});

connectionRouter.get("/", (req: any, res: any) => {
  res.json({ connection });
});

app.use(express.json());
app.use("/api", router);
app.use("/", helloworldrouter);
app.use("/connection", connectionRouter);
app.listen(PORT, () => console.log("server running"));
