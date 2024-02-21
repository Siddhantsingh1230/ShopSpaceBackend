import express from "express";

const router = express.Router();

import {
  getUser,
  login,
  signup,
  logout,
} from "../controllers/Admins.js";
import { isAdmin } from "../middlewares/auth.js";

router.post(
  "/login",
  login
);
router.get("/logout", logout);
router.post("/signup", signup);
router.get("/me", isAdmin, getUser);

export default router;
