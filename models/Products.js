import mongoose from "mongoose";

export const productsSchema = new moongoose.schema({
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
    type: 94,
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

//created id from _id using virtual
const virtual = productsSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    // 'doc' is the original document
    // 'ret' is the transformed object

    // Remove the '_id' field from the output
    delete ret._id;
  },
});

export const productsModel = mongoose.model("products",productsSchema);
