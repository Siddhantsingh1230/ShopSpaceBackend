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
    const { value, label } = req.body;
    let existingCategory = await categoriesModel.findOne({label : label });
    if (existingCategory) {
      return res.status(500).json({
        success: false,
        message: "Category already exist",
      });
    }
    let category = await categoriesModel.create({
      value,
      label,
    });
    return res.status(500).json({
      success: true,
      category: category,
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
