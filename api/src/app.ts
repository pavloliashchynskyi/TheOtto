/* eslint-disable no-console */
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import collectUserDataRouter from "./routers/collectUserDataRouter";
import getCollectedUserDataFromDBRouter from "./routers/getCollectedUserDataFromDBRouter";

dotenv.config({ path: "./.env" });

const MONGO_URL = process.env.MONGO_URL;

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: process.env.CLIENT_DOMAIN }));

app.use(express.json());

app.use("/collect-data", collectUserDataRouter);
app.use("/fetch-collected-data", getCollectedUserDataFromDBRouter);

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
