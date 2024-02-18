import express from "express";
import passport from "passport";

const router = express.Router();

import {
  getUser,
  login,
  signup,
  logout,
  loginFailed,
} from "../controllers/Admins.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
    failureRedirect: "/v1/admin/loginfailed",
    session:false,
  }),
  login
);
router.get("/loginfailed", loginFailed);
router.get("/logout", logout);
router.post("/signup", signup);
router.get("/me", isAuthenticated, getUser);

export default router;
