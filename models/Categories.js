import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
    unique: true,
  },
  checked: {
    //not required
    type: Boolean,
    default: false,
  },
});

export const categoryModel = mongoose.model("categories", categorySchema);