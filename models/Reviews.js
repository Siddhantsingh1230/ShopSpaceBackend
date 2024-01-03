import mongoose from "mongoose"

const reviewsSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "users"
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "products"
    },
    content : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
});

export const reviewsModel = mongoose.model("reviews",reviewsSchema);
