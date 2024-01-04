import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  itemCount: {
    type: Number,
    default: 0,
  },
}, { _id: false });

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique : true,
  },
  subcategories: {
    type: [subcategorySchema],
    default: [],
  },
});

export const categoriesModel = mongoose.model("categories", categorySchema);