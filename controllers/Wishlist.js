import { wishlistModel } from "../models/Wishlist.js";
import { productsModel } from "../models/Products.js";
import mongoose from "mongoose";

export const getWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await wishlistModel.findOne({ userId: id });
    if (data) {
      const wishlist = await Promise.all(
        data.productId.map(async (productId) => {
          let item = await productsModel.findById(productId);
          return item;
        })
      );
      return res.status(200).json({
        sucsess: true,
        wishlist,
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
        error: error,
      });
    }
  }
};

export const addProductToWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    let { productId } = req.body;
    productId = new mongoose.Types.ObjectId(productId);
    let wishlist = await wishlistModel.findOne({ userId: id });

    if (!wishlist) {
      let data = await wishlistModel.create({
        userId: id,
        productId: [productId],
      });
      wishlist = await Promise.all(
        data.productId.map(async (productId) => {
          let item = await productsModel.findById(productId);
          return item;
        })
      );
      return res.status(200).json({
        success: true,
        message: "Successfully added the product and created wishlist",
        wishlist,
      });
    }

    if (wishlist.productId.includes(productId)) {
      wishlist = await Promise.all(
        wishlist.productId.map(async (productId) => {
          let item = await productsModel.findById(productId);
          return item;
        })
      );
      return res.status(200).json({
        success: true,
        message: "This product is already in the wishlist",
        wishlist,
      });
    }

    wishlist = await wishlistModel.findOneAndUpdate(
      { userId: id },
      { $push: { productId: productId } },
      { new: true }
    );
    wishlist = await Promise.all(
      wishlist.productId.map(async (productId) => {
        let item = await productsModel.findById(productId);
        return item;
      })
    );
    return res.status(200).json({
      success: true,
      message: "Successfully added the product",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
    console.log(error)
  }
};

export const removeProductFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = req.body.productId;
    let wishlist = await wishlistModel.findOneAndUpdate(
      { userId: id },
      { $pull: { productId: productId } },
      { new: true } // Return the modified document
    );
    if (wishlist) {
      wishlist = await Promise.all(
        wishlist.productId.map(async (productId) => {
          let item = await productsModel.findById(productId);
          return item;
        })
      );
      return res.status(200).json({
        sucsess: true,
        message: "successfully removed the product from wishlist",
        wishlist,
      });
    }
    return res.status(400).json({
      sucsess: true,
      message: "Wishlist not found",
    });
  } catch (error) {
    if (error) {
      res.status(400).json({
        sucsess: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};
