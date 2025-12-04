import express from "express";
import { dashboardData } from "../controller/dashboard.controller.js";

const router = express.Router();

router.get("/", dashboardData);

export default router;
