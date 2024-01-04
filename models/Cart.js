import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true,
      },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    quantity: {
        type: Number,
        required: true,
        default: 1,
      },
});

export const cartsModel = mongoose.model("carts",cartsSchema);