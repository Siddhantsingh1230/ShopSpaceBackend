import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  checkoutEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  billingaddress: {
    type: String,
    required: true,
  },
  billingState: {
    type: String,
    required: true,
  },
  billingZip: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  placedOn: {
    type: String,
    required: true,
  },
  deliveredOn: {
    type: String,
    required: true,
  },
  totalAmount:{
    type:Number,
    required : true,
  },
  status:{
    type:String,
    required : true,
  },
  userId :{
    type  : mongoose.Schema.Types.ObjectId,
    ref:"users",
    required : true,
  },
  cartId:{
    type  : mongoose.Schema.Types.ObjectId,
    ref:"carts",
    required : true,
  }
});

//created id from _id using virtual
const virtual = ordersSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

ordersSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    // 'doc' is the original document
    // 'ret' is the transformed object

    // Remove the '_id' field from the output
    delete ret._id;
  },
});

export const ordersModel = mongoose.model("orders",ordersSchema)
