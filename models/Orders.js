import mongoose from "mongoose";
import { cartsSchema } from "./Cart";

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
  cart:{
    type: [cartsSchema],
  }
});

export const cartsModel = mongoose.model("orders",ordersSchema)
