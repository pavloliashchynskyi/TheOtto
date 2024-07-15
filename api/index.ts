/* eslint-disable no-console */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env"});

const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL) {
  mongoose.connect(MONGO_URL).then(async () => {
    console.log("Connected to Mongo Database");
  }).catch((err: any) => {
       console.error(err.message);
  });
}