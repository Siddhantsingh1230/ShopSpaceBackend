import mongoose from "mongoose";

const dealOfTheDaySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  offerDuration: {
    type: Date,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const dealOfTheDayModel = mongoose.model("dealOfTheDay", dealOfTheDaySchema);
