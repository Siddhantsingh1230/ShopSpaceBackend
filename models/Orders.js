import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  checkoutEmail: {
    type: String,
    required: true,
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

export const ordersModel = mongoose.model("orders",ordersSchema)
