/* eslint-disable no-console */
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import collectUserDataRouter from "./routers/collectUserDataRouter";

dotenv.config({ path: "./.env" });

const MONGO_URL = process.env.MONGO_URL;

const app = express();
const port = 4444;

app.use(cors());

app.use(express.json());

app.use("/collect-data", collectUserDataRouter);

app.listen(port, () => {
  console.log(`Server has been started at port ${port}`);

  if (MONGO_URL) {
    mongoose
      .connect(MONGO_URL)
      .then(async () => {
        console.log("Connected to Mongo DB");
      })
      .catch((err: any) => {
        console.error(err.message);
      });
  }
});
