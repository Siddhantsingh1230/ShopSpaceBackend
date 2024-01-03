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
    trim: true,
    lowercase: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
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

//created id from _id using virtual
const virtual = usersSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

usersSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    // 'doc' is the original document
    // 'ret' is the transformed object

    // Remove the '_id' field from the output
    delete ret._id;
  },
});

export const usersModel = mongoose.model("users", usersSchema);
