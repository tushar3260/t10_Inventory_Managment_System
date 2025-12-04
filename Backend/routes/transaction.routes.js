import express from "express";
import { getTransactions,createTransaction } from "../controller/transaction.controller.js";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", createTransaction);
export default router;
