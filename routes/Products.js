import express from "express";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  filterProduct,
  getQuantizedProducts,
  getProductById,
} from "../controllers/Products.js";
import { isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/:page/:quantum/", getQuantizedProducts);
router.get("/filter", filterProduct);
router.post("/add", isAdmin, addProduct);
router.delete("/delete/:id", isAdmin, deleteProduct);

export default router;
