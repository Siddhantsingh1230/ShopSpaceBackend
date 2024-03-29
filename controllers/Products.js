import { FIREBASE_PRODUCTS_FOLDER } from "../data/constants.js";
import { deletefile } from "../data/firestorage.js";
import { productsModel } from "../models/Products.js";
import mongoose from "mongoose";

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
    const searchKeyword = decodeURIComponent(req.query.s);
    const regex = searchKeyword ? new RegExp(searchKeyword, "i") : /.*/;
    const query = {
      $or: [
        { title: { $regex: regex } },
        { category: { $regex: regex } },
        { brand: { $regex: regex } },
        { subCategory: { $regex: regex } },
      ],
    };
    // Count the number of documents that match the query
    const count = await productsModel.countDocuments(query);
    const products = await productsModel
      .find(query)
      .sort({ rating: -1 })
      .skip(quantum * (parseInt(page) + 1 - 1))
      .limit(quantum);
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
    console.log(error);
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
      message: "Product added",
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

const extractFilenameFromURL = (url) => {
  const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;

  // Test the string against the regular expression
  if (urlPattern.test(url)) {
    try {
      // Create a URL object
      const urlObject = new URL(url);

      // Get the pathname (which includes the filename)
      const pathname = urlObject.pathname;

      // Extract the filename from the pathname and remove directory structure
      const filename = pathname.split("/").pop().split("%2F").pop();

      // Decode the URL-encoded filename
      const decodedFilename = decodeURIComponent(filename);

      return decodedFilename;
    } catch (error) {
      return url;
    }
  } else {
    return url;
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productsModel.findOne({ _id: id });
    if (product) {
      let thumbnail = extractFilenameFromURL(product.thumbnail);
      await deletefile(FIREBASE_PRODUCTS_FOLDER, thumbnail);
      product.images.map(async (img) => {
        let parsedImg = extractFilenameFromURL(img);
        await deletefile(FIREBASE_PRODUCTS_FOLDER, parsedImg);
      });
      const result = await productsModel.deleteOne({ _id: id });
      const products = await productsModel.find({});
      if (products) {
        return res.status(200).json({
          success: true,
          products,
        });
      }
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

export const getProductById = async (req, res) => {
  let { id } = req.params;
  try {
    id = new mongoose.Types.ObjectId(id.trim());
    const product = await productsModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const incViewCount = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsModel.findOneAndUpdate(
      { _id: id },
      { $inc: { viewCount: 1 } }, // Increment viewCount by 1
      { new: true }
    );
    res.status(200).json({
      success: true,
      viewCount: product.viewCount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const topviewed = async (req, res) => {
  try {
    // Finds the top 5 products based on viewCount
    const topProducts = await productsModel.aggregate([
      {
        $sort: { category: 1, viewCount: -1 }, // Sort by category and then by viewCount in descending order
      },
      {
        $group: {
          _id: "$category", // Group by category
          topProduct: { $first: "$$ROOT" }, // Take the top product from each category
        },
      },
      {
        $replaceRoot: { newRoot: "$topProduct" }, // Replace the root document with the top product
      },
      {
        $limit: 5, // Limit to the top 5 products
      },
    ]);

    res.status(200).json({ success: true, products: topProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const toprated = async (req, res) => {
  try {
    // Find the top-rated 4 products based on the rating
    const topRatedProducts = await productsModel
      .find({})
      .sort({ rating: -1 }) // Sort in descending order based on rating
      .limit(4); // Limit to the top 4 products

    res.status(200).json({ success: true, products: topRatedProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const latestproducts = async (req, res) => {
  try {
    // Find the top 4 latest products based on the createdAt field
    const latestProducts = await productsModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(4);
    res.status(200).json({ success: true, products: latestProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    let { count } = req.query;
    const randomProducts = await productsModel.aggregate([
      { $sample: { size: parseInt(count) } },
    ]);
    res.status(200).json({ success: true, products: randomProducts });
  } catch (error) {
    console.error("Error getting random products:", error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    let products = await productsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Product not updated" });
    }
    products = await productsModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error" + error });
  }
};

export const getTotalViewsForAllProducts = async (req, res) => {
  try {
    // Use the aggregate pipeline to calculate the total views for all products
    const result = await productsModel.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$viewCount" },
        },
      },
    ]);

    // Check if the result is not empty
    if (result.length > 0) {
      const totalViews = result[0].totalViews;
      return res.status(200).json({ success: true, totalViews });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching total views for all products:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
