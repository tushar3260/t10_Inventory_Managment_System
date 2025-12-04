import express from "express";
import { register, login } from "../controller/user.controller.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",  register); // only admin can create users
router.post("/login", login);

export default router;
