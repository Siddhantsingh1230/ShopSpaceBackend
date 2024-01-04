import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: 1,
    max: 99.99,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  stock: {
    type: Number,
    min: 0,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  thumbnail: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  images: {
    type: [String],
    required: true,
    validated: {
      validator: function (value) {
        return Array.isArray(value) && value.length > 0;
      },
      message: "Images must not be empty",
    },
  },
});

export const productsModel = mongoose.model("products", productsSchema);
