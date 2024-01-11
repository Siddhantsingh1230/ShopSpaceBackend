import express from "express";
import { getAllCarts,deleteCart,updateCart,addCart } from "../controllers/Cart.js";

const router = express.Router();
router.get("/:id",getAllCarts);
router.patch("/add",addCart);
router.patch("/update",updateCart);
router.delete("/delete",deleteCart);

export default router;