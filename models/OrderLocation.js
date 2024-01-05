import mongoose from "mongoose";

const orderLocationSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    value : {
        type : String,
        required : true
    },
})

export const orderLocationModel = mongoose.model("orderLocations",orderLocationSchema);