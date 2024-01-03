import mongoose from "mongoose";
import { DefaultProfileImageURL } from "../data/constants.js";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  profileImageURL: {
    type: String,
    default: DefaultProfileImageURL,
  },
  enableNotifications: {
    // For Future use
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tokenCreated: {
    //for handling password change on request
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "astro", // role can be either Astro(nornal user) or admin
  },
});

export const usersModel = mongoose.model("users", usersSchema);
