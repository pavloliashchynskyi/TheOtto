/* eslint-disable no-console */
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env"});

const MONGO_URL = process.env.MONGO_URL;


const app = express();
const port = 4444;

app.use(cors({ origin: process.env.CLIENT_DOMAIN }));

app.use(express.json());

app.listen(port, () => {
        console.log(`Server has been started at port ${port}`);

        if (MONGO_URL) {
                mongoose.connect(MONGO_URL).then(async () => {
                    console.log("Connected to Mongo Database");
                }).catch((err: any) => {
                    console.error(err.message);
                });
                }
            },
);