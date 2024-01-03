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

//created id from _id using virtual
const virtual = reviewsSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

reviewsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    // 'doc' is the original document
    // 'ret' is the transformed object

    // Remove the '_id' field from the output
    delete ret._id;
  },
});


export const reviewsModel = mongoose.model("reviews",reviewsSchema);
