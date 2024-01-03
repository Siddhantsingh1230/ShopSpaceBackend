import { usersModel } from "../models/Users.js";
import bcrypt from "bcrypt";

export const getAllRegisteredUsers = async (req, res) => {
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
  const { email, password } = req.body;
  let user = await usersModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "incorrect email or password",
    });
  }
  res
    .status(200)
    .json({ success: true, message: `Welcome , ${user.username}` }, user);
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
  res
    .status(200)
    .json({ success: true, message: `Acccount Created | ${username}` }, user);
};

export const getUser = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const logout = async (req, res) => {
  
};
