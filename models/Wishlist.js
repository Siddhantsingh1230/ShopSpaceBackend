import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {
        userId :{
            type: mongoose.Schema.Types.ObjectId,
            ref:"users",
            required: true,
            unique:true,
        },
        productId :{
            type: [mongoose.Schema.Types.ObjectId],
            ref:"products",
            required: true,
        }
    }
)

export const wishlistModel = mongoose.model("wishlist",wishlistSchema);