import express from "express";
import { collectUserDataController } from "../controllers/userData/collectUserDataController";

const router = express.Router();

router.post("/", collectUserDataController);

export default router;
