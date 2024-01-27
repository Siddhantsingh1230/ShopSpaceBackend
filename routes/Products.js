import express from "express";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  filterProduct,
  getQuantizedProducts,
  getProductById,
  incViewCount,
  topviewed,
  toprated,
  latestproducts,
  getRecommendations,
  updateProductById,
} from "../controllers/Products.js";
import { isAdmin } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import { productToFirebase } from "../middlewares/productImgFirebase.js";

const router = express.Router();

// note for you khushi the order of routes matter here else will get blunders
router.get("/topviewed", topviewed);
router.get("/toprated", toprated);
router.get("/getrecommendations", getRecommendations);
router.get("/latestproducts", latestproducts);
router.get("/", getAllProducts);
router.get("/:page/:quantum/", getQuantizedProducts);
router.get("/filter", filterProduct);
router.post(
  "/add",
  isAdmin,
  upload.array("images"),
  productToFirebase,
  addProduct
);
router.delete("/delete/:id", isAdmin, deleteProduct);
router.patch("/viewcount/:id", incViewCount);
router.patch("/update/:id", isAdmin, updateProductById);
//it should remain at last
router.get("/:id", getProductById);

export default router;
