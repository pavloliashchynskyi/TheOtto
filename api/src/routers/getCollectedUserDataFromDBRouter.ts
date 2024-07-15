import express from "express";
import { getCollectedUserDataFromDBController } from "../controllers/userData/getCollectedUserDataFromDBController";

const router = express.Router();

router.get("/", getCollectedUserDataFromDBController);

export default router;
