import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  checkoutEmail: {
    type: String,
    required: true,
  },
  billingAddress: {
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
    type: Date,
    default : Date.now()
  },
  deliveredOn: {
    type: Date,
    default : Date.now() +15
  },
  totalAmount:{
    type:Number,
    required : true,
  },
  status:{
    type:String,
    required : true,
    default: "pending",
  },
  userId :{
    type  : mongoose.Schema.Types.ObjectId,
    ref:"users",
    required : true,
  },
  cart: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  cardholder: {
    type: String,
    default: "",
  },
  cardno: {
    type: String,
    default: "",
  },
  creditexpiry: {
    type: String,
    default: "",
  },
  cardcvv: {
    type: String,
    default: "",
  },
});

export const ordersModel = mongoose.model("orders",ordersSchema)
