import { cartsModel } from "../models/Cart.js";

export const getAllCarts = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartsModel.find({ userId: id }).populate("productId");
    if (cart) {
      return res.status(200).json({
        success: true,
        cart: cart,
      });
    }
    return res.status(400).json({
      success: false,
      message: "cart not found",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const addCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await cartsModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (cart) {
      cart = await cartsModel.updateOne(
        { userId, productId },
        { $inc: { quantity: 1 } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        cart: cart,
      });
    }
    cart = await cartsModel.create({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully added product to the cart",
      cart,
    });
  } catch (error) {
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    let result = await cartsModel.findByIdAndDelete(id);
    if (result) {
      let cart = await cartsModel.find({userId: userId }).populate("productId");
      return res.status(200).json({
        success: true,
        cart: cart,
      });
    }
    return res.status(400).json({
      success: false,
      message: "cart not found",
    });
  } catch (error) {
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await cartsModel.findOneAndUpdate(
      { userId, productId },
      { $set: { quantity } },
      { new: true }
    );

    if (cart) {
      cart = await cartsModel.find({ userId }).populate("productId");
      return res.status(200).json({
        success: true,
        message: "cart updated",
        cart: cart,
      });
    }
    return res.status(400).json({
      success: false,
      message: "cart not found",
    });
  } catch (error) {
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};
