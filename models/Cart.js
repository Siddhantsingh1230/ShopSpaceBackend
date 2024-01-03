import mongoose from "mongoose";
import { productsSchema } from "./Products";

export const cartsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true,
      },
    product: {
        type: [productsSchema],
        ref: "products",
        required: true,
      },
    quantity: {
        type: Number,
        required: true,
        default: 1,
      },
});

//created id from _id using virtual
const virtual = cartsSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

cartsSchema.set("toJson", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    // 'doc' is the original document
    // 'ret' is the transformed object

    // Remove the '_id' field from the output
    delete ret._id;
  },
});

export const cartsModel = mongoose.model("carts",cartsSchema);