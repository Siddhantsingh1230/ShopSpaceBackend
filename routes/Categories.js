import express from "express";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../controllers/Categories.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/add", addCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
