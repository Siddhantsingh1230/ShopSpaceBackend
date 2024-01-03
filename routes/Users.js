import express from "express";
const router = express.Router();
import {
    getAllRegisteredUsers,
  getUser,
  login,
  signup,
  logout,
} from "../controllers/Users.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.get("/showusers", getAllRegisteredUsers); // for admin use
router.post("/login", login);
router.get("/logout", logout);
router.post("/signup", signup);
router.get("/me", isAuthenticated, getUser);

export default router;