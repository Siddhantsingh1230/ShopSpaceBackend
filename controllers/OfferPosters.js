import { deletefile, uploadFile } from "../data/firestorage.js";
import { offerPostersModel } from "../models/OfferPosters.js";
import { FIREBASE_OFFERS_FOLDER } from "../data/constants.js";

export const getPosters = async (req, res) => {
  try {
    const offers = await offerPostersModel.find({}).sort({ createdAt: -1 });
    if (!offers) {
      return res
        .status(404)
        .json({ success: false, message: "No image found" });
    }
    res.status(200).json({ success: true, offers });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
export const addNewPoster = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(500)
        .json({ success: false, message: "No image provided" });
    }
    // Access file data
    const fileBuffer = req.file.buffer;
    const posterImageName = `${Date.now()}-${req.file.originalname}`;
    const posterImageURL = await uploadFile(
      FIREBASE_OFFERS_FOLDER,
      posterImageName,
      fileBuffer
    );
    const { productId } = req.body;
    const offerObject = {
      productId,
      posterImageName,
      posterImageURL,
    };
    const poster = await offerPostersModel.create(offerObject);
    if (!poster) {
      return res
        .status(500)
        .json({ success: false, message: "Fail to Upload" });
    }
    res.status(200).json({ success: true, message: "Offer added", poster });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to Upload", error });
  }
};
export const deletePoster = async (req, res) => {
  try {
    const { id } = req.params;
    const poster = await offerPostersModel.findByIdAndDelete(id);
    if (!poster) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete" });
    }
    await deletefile(FIREBASE_OFFERS_FOLDER, poster.posterImageName);
    res.status(200).json({ success: true, message: "File Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to Delete", error });
  }
};
export const updatePoster = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    const offer = await offerPostersModel.findByIdAndUpdate(
      id,
      { productId },
      { new: true }
    );
    if (!offer) {
      return res
        .status(404)
        .json({ success: false, message: "No Offer Found" });
    }
    res.status(200).json({ success: true, offer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to Update", error });
  }
};
