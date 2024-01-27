import { FIREBASE_PRODUCTS_FOLDER } from "../data/constants.js";
import { uploadFile } from "../data/firestorage.js";

export const productToFirebase = async (req, res, next) => {
  try {
    const files = req.files;
    let images = [];
    let thumbnail = "";
    await Promise.all(
      files.slice(0, files.length - 1).map(async (file) => {
        let url = await uploadFile(
          FIREBASE_PRODUCTS_FOLDER,
          file.originalname,
          file.buffer
        );
        images.push(url);
      })
    );
    thumbnail = await uploadFile(
      FIREBASE_PRODUCTS_FOLDER,
      files[files.length - 1].originalname,
      files[files.length - 1].buffer
    );
    req.body.thumbnail = thumbnail;
    req.body.images = images;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
