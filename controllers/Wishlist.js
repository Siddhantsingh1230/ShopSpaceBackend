import { wishlistModel } from "../models/Wishlist.js";
import { productsModel } from "../models/Products.js";

export const getWishlist = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("got id");
    const data = await wishlistModel.findOne({userId: id });
    console.log("got data");
    if (data) {
      const wishlist = data.productId.map(async (item, productId) => {
        item = await productsModel.findById({ productId });
      });
      return res.status(200).json({
        sucsess: true,
        wishlist
      });
    }
    res.status(400).json({
        sucsess: false,
        message: "wislist not found",
      });
  } catch (error) {
    if (error) {
      res.status(400).json({
        sucsess: false,
        message: "Internal server error",
        error:error
      });
      console.error(error)
    }
  }
};

