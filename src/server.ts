import express, { Router } from "express";
import dotenv from "dotenv";
import { router, helloworldrouter } from "./routes";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

dotenv.config();

if (process.env.DB_CONNECT) {
  mongoose.connect(
    process.env.DB_CONNECT.concat("cosmosVendt"),
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
      console.log("connected to db");
    }
  );
}

app.use(express.json());
app.use("/api", router);
app.use("/", helloworldrouter);
app.listen(PORT, () => console.log("server running"));
