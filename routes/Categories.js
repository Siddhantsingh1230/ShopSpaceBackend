import express from "express";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/Categories.js";
import {isAdmin} from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/add",isAdmin,addCategory);
router.delete("/delete/:id",isAdmin, deleteCategory);
router.patch("/update/:id",isAdmin,updateCategory);

export default router;
