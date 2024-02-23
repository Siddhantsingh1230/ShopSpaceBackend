import { usersModel } from "../models/Users.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  sanitizeUser,
  sendCookie,
  sendPasswordResetMail,
  sendRegMail,
} from "../utils/services.js";

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
  const { email, password } = req.body;
  let user = await usersModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(500).json({
      success: false,
      message: "Invalid email or password!",
    });
  }
  sendCookie(sanitizeUser(user), res, `Welcome back, ${user.username}`);
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
  sendRegMail(
    username,
    new Date().getFullYear(),
    process.env.EMAIL_ID,
    process.env.EMAIL_PASS,
    email,
    `Welcome,${username} to ShopSpace`
  );
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
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true,
      })
      .json({ success: true, message: "Logout successfull" });
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
    res.status(200).json({ success: true, message: "Account Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await usersModel.findByIdAndUpdate(
      id,
      { ...req.body, password: hashedPassword },
      {
        new: true,
      }
    );
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

export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  let user = await usersModel.findOne({ email }); // checking if user already exists or not
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY,
    { expiresIn: 300 }
  );
  const link = `${process.env.FRONTEND_URI}/resetpassword/${user._id}/${token}`;
  sendPasswordResetMail(
    user.username,
    new Date().toLocaleString(),
    process.env.EMAIL_ID,
    process.env.EMAIL_PASS,
    user.email,
    link
  );
  res.status(200).json({ success: true, message: "Check your email" });
};
export const resetpassword = async (req, res) => {
  const { id, password, token } = req.body;
  let user = await usersModel.findById(id); // checking if user already exists or not
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Token Expired",
      });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    user = await usersModel.findByIdAndUpdate(id, { password: hashedPassword });
    res.status(200).json({
      success: true,
      message: "Password updated",
    });
  });
  req.logout((error) => {
    // console.log(error);
  });
};

export const getUserNameByUserId = async (req, res) => {
  let { id } = req.params;
  id = new mongoose.Types.ObjectId(parseInt(id.trim()));
  const user = await usersModel.findById(id);
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "failed to fetch user" });
  }
  res.status(200).json({
    success: true,
    username: user.username,
  });
};

export const getTotalUsers = async (req, res) => {
  try {
    let count = await usersModel.countDocuments({});
    if (count) {
      return res.status(200).json({ success: true, count });
    }
    return res.status(404).json({ success: false, message: "no user found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};
