import mongoose from "mongoose";

const brandsSchema = new mongoose.Schema({
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
});

export const brandsModel = mongoose.model("brands", brandsSchema);
