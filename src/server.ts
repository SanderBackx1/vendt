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
    process.env.DB_CONNECT.concat("cosmosVendt"),
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
      connection = true;
      console.log("connected to db");
    }
  );
}

const rrouter = express.Router();
rrouter.get("/", (req: any, res: any) => {
  res.json({ connection });
});

app.use(express.json());
app.use("/api", router);
app.use("/", helloworldrouter);
app.use("/connection", rrouter);
app.listen(PORT, () => console.log("server running"));
