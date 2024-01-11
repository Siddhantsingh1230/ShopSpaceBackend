import mongoose from "mongoose";

const salesSchema = mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    saleCount:{
        type:Number,
        default:0,
    }
});

export const saleModel = mongoose.model("sales",salesSchema);