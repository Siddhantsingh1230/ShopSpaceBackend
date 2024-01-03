import { sanitizeUser } from "../utils/services.js";

export const isAuthenticated = (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.status(404).json({ success: false, message: "Login to access" });
  }
  // user is already logged in
  req.user = sanitizeUser(user);
  next();
};

export const isAdmin = (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.status(500).json({ success: false, message: "Login to access" });
  }
  // user is already logged in
  if (user.role !== "admin") {
    return res.status(500).json({ success: false, message: "UnAuthorized" });
  }
  next();
};