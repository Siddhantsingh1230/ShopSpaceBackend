import { usersModel } from "../models/Users.js";
import { sanitizeUser } from "../utils/services.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Log in first",
    });
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const id = decoded._id;
  const user = await usersModel.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  req.user = sanitizeUser(user);
  next();
};

export const isAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login to access",
    });
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const id = decoded._id;
  const user = await usersModel.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (user.role !== "admin") {
    return res.status(500).json({ success: false, message: "UnAuthorized" });
  }
  req.user = sanitizeUser(user);
  next();
  // user is already logged in
  
};
