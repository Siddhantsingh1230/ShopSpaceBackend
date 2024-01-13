import { dealOfTheDayModel } from "../models/DealOfTheDay.js";

export const getAllDeals = async (req, res) => {
  try {
    const deals = await dealOfTheDayModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("productId");
    if (!deals) {
      return res
        .status(404)
        .json({ success: false, message: "No Deals Found" });
    }
    res.status(200).json({ success: true, deals });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
export const getCurrentDeal = async (req, res) => {
  try {
    const deals = await dealOfTheDayModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("productId")
      .limit(1);
    if (!deals) {
      return res.status(404).json({ success: false, message: "No Deal Found" });
    }
    res.status(200).json({ success: true, deals });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
export const addNewDeal = async (req, res) => {
  try {
    const { productId, offerDuration } = req.body;
    const deal = dealOfTheDayModel.create({ productId, offerDuration });
    if (!deal) {
      return res
        .status(404)
        .json({ success: false, message: "No Deals Found" });
    }
    res.status(200).json({ success: true, deal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
export const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deal = dealOfTheDayModel.findByIdAndDelete(id);
    if (!deal) {
      return res.status(404).json({ success: false, message: "No Deal Found" });
    }
    res.status(200).json({ success: true, message: "Deal Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
export const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { offerDuration } = req.body;
    const deal = dealOfTheDayModel.findByIdAndUpdate(
      id,
      { offerDuration },
      { new: true }
    );
    if (!deal) {
      return res.status(404).json({ success: false, message: "No Deal Found" });
    }
    res.status(200).json({ success: true, deal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
