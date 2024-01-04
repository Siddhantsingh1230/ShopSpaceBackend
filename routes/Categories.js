import express from "express";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/Categories.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/add", addCategory);
router.delete("/delete/:id", deleteCategory);
router.patch("/update/:id", updateCategory);

export default router;
