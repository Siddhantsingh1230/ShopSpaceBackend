import { categoriesModel } from "../models/Categories.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesModel.find({});
    if (!categories) {
      return res.status(500).json({
        success: false,
        message: "could not fetch categories",
      });
    }
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const addCategory = async (req, res) => {
  try {
    const category = req.body;
    let existingCategory = await categoriesModel.findOne({
      label: category.label,
    });
    if (existingCategory) {
      return res.status(500).json({
        success: false,
        message: "Category already exist",
      });
    }
    let result = await categoriesModel.create(category);
    return res.status(200).json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = req.body;
    let result = await categoriesModel.updateOne({ _id: id }, category);
    if (!result) {
      return res.status(500).json({
        success: false,
        result: result,
      });
    }
    return res.status(200).json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    let category = await categoriesModel.findOne({ _id: id });
    if (category) {
      let result = await categoriesModel.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: "category deleted successfully",
        result: result,
      });
    }

    return res.status(500).json({
      success: false,
      message: "category does not exist",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
