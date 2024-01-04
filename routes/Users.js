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

export default router;
