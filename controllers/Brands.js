import { brandsModel } from "../models/Brands.js";

export const getAllBrands = async (req, res) => {
  try {
    const brands = await brandsModel.find({});
    if (!brands) {
      return res.status(500).json({
        success: false,
        message: "could not fetch brands",
      });
    }
    return res.status(200).json({
      success: true,
      brands,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const addBrand = async (req, res) => {
  try {
    const { value, label } = req.body;
    let existingBrand = await brandsModel.findOne({label : label });
    if (existingBrand) {
      return res.status(500).json({
        success: false,
        message: "brand already exist",
      });
    }
    let brand = await brandsModel.create({
      value,
      label,
    });
    return res.status(500).json({
      success: true,
      message: brand,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;
    let brand = await brandsModel.findOne({ _id: id });
    if (brand) {
      let result = await brandsModel.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: "brand deleted successfully",
        result: result,
      });
    }

    return res.status(500).json({
      success: false,
      message: "brand does not exist",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
