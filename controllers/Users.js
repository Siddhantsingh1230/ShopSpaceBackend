import { usersModel } from "../models/Users.js";
import bcrypt from "bcrypt";
import { sanitizeUser } from "../utils/services.js";

export const getAllRegisteredUsers = async (req, res) => {
  // only admins can access this route
  const users = await usersModel.find({});
  if (!users) {
    return res

      .status(500)
      .json({ success: false, message: "failed to fetch users" });
  }
  res.status(200).json({
    success: true,
    users,
  });
};

export const login = async (req, res) => {
  // you will reach this only if ur sucessfully logged in else not
  res.status(200).json({
    success: true,
    message: `Welcome , ${req.user.username}`,
    user: sanitizeUser(req.user),
  });
};

export const loginFailed = (req, res) => {
  return res.status(500).json({
    success: false,
    message: "Invalid Credentials",
  });
};

export const signup = async (req, res) => {
  const { username, mobileNo, email, password } = req.body;
  let user = await usersModel.findOne({ email }); // checking if user already exists or not
  if (user) {
    return res.status(500).json({
      success: false,
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await usersModel.create({
    username,
    mobileNo,
    email,
    password: hashedPassword,
  });
  //Send Registration successfull mail here
  res.status(200).json({
    success: true,
    message: `Welcome Astro | Goto Login`,
    // user: sanitizeUser(user),// no need still sent for debugging
  });
};

export const getUser = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ success: true, message: "Logged out" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not deleted" });
    }
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Details updated!",
      user: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error:" + error,
    });
  }
};
