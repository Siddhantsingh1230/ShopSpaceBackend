import mongoose from "mongoose";

const offerPostersSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  posterImageName:{
    type: String,
    required:true,
  },
  posterImageURL: {
    type: String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const offerPostersModel = mongoose.model("offerPosters", offerPostersSchema);
