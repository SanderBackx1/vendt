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
    "mongodb://vendt:qzoB6lXUrZ3qeqmg3dzNtVaa8zkHVGivYgbtgQwDrITpxtt0Kb714UqJ2rpUBSfQF76JncT4k9q6Sr84zSwzpA==@vendt.mongo.cosmos.azure.com:10255/cosmosVendt?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@vendt@",
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
