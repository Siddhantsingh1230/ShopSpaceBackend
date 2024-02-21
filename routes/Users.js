import express from "express";

const router = express.Router();
import {
  getAllRegisteredUsers,
  getUser,
  login,
  signup,
  logout,
  updateUser,
  deleteUser,
  forgotpassword,
  resetpassword,
  getUserNameByUserId,
  getTotalUsers
} from "../controllers/Users.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

router.get("/showusers", isAdmin, getAllRegisteredUsers); // for admin use only
router.post(
  "/login",
  login
);
router.get("/logout", logout);
router.get("/getTotalUsers", getTotalUsers);
router.post("/signup", signup);
router.get("/me", isAuthenticated, getUser);
router.put("/update/:id", isAuthenticated, updateUser);
router.delete("/delete/:id", isAuthenticated, deleteUser);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
router.get("/user/:id", getUserNameByUserId);

export default router;
