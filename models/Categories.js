import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  itemCount: {
    type: Number,
    default: 0,
    required: true,
  },
  src:{
    type: String,
    required:true
  }
}, { _id: false });

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique : true,
  },
  src:{
    type: String,
    required:true
  },
  subcategories: {
    type: [subcategorySchema],
    default: [],
  },
  
});

export const categoriesModel = mongoose.model("categories", categorySchema);