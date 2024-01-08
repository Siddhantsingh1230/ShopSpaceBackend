import { productsModel } from "../models/Products.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.find({});
    if (!products) {
      return res.status(500).json({
        success: false,
        message: "failed to fetch products",
      });
    }
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
export const getQuantizedProducts = async (req, res) => {
  try {
    const { quantum, page } = req.params;
    const products = await productsModel
      .find({})
      .sort({ rating: -1 })
      .skip(quantum * (parseInt(page) + 1 - 1))
      .limit(quantum);
    const count = await productsModel.countDocuments();
    if (!products) {
      return res.status(500).json({
        success: false,
        message: "failed to fetch products",
      });
    }
    res.status(200).json({
      success: true,
      products,
      pagesReturned: parseInt(page) + 1,
      count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    let product = await productsModel.findOne({ title: newProduct.title });
    if (product) {
      return res.status(500).json({
        success: false,
        message: " product already exist",
      });
    }
    product = await productsModel.create(newProduct);
    return res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "internal server error",
        error: error,
      });
    }
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productsModel.findOne({ _id: id });
    if (product) {
      const result = await productsModel.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        result: result,
      });
    }
    return res.status(500).json({
      success: false,
      message: " product doesn't exist",
    });
  } catch (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
        error: error,
      });
    }
  }
};

export const filterProduct = async (req, res) => {
  try {
    const type = req.query.type;
    let products;
    if (type === "brand") {
      const name = req.query.name;
      products = await productsModel.find({ brand: name });
    } else if (type === "category") {
      const name = req.query.name;
      products = await productsModel.find({ category: name });
    } else if (type === "sort") {
      const name = req.query.name;
      const order = req.query.order;
      if (name === "price") {
        products = await productsModel.find().sort({ price: 1 }).exec();
      }
    }

    if (!products || products.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
        error: error,
      });
    }
  }
};
