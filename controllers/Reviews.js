import { reviewsModel } from "../models/Reviews.js";

export const getReviewsByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await reviewsModel.find({ productId: id });
    if (!reviews) {
      return res.status(500).json({
        success: false,
        message: "No reviews found",
      });
    }
    return res.status(200).json({
      success: true,
      reviews: reviews,
    });
  } catch (err) {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
  }
};

export const addReview = async (req, res) => {
  try {
    const review = req.body;
    const result = await reviewsModel.create(review);
    if (result) {
      return res.status(200).json({
        success: true,
        review: result,
      });
    }
    res.status(500).json({
      success: false,
      message: "cannot create review",
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
};

export const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await reviewsModel.deleteOne({ _id: id });
    if (result) {
      return res.status(200).json({
        success: true,
        result: result,
      });
    }
    res.status(500).json({
      success: false,
      message: "Review doesn't exist",
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
};
