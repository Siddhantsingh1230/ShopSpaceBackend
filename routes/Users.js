import express from "express";
import passport from "passport";

const router = express.Router();
import {
  getAllRegisteredUsers,
  getUser,
  login,
  signup,
  logout,
  loginFailed,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

router.get("/showusers", isAdmin, getAllRegisteredUsers); // for admin use only
router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
    failureRedirect: "/v1/loginfailed",
  }),
  login
);
router.get("/loginfailed", loginFailed);
router.get("/logout", logout);
router.post("/signup", signup);
router.get("/me", isAuthenticated, getUser);
router.put("/update/:id", isAuthenticated, updateUser);
router.delete("/delete/:id", isAuthenticated, deleteUser);

export default router;
