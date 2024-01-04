import mongoose from "mongoose";

const orderStateSchema = new mongoose.Schema({
    value : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    }
})

export const orderStateModel = mongoose.model("orderstates",orderStateSchema);