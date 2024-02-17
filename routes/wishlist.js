import express from "express";
import { getWishlist,addProductToWishlist,removeProductFromWishlist } from "../controllers/Wishlist.js";

const router = express.Router();
router.get("/:id",getWishlist);
router.patch("/add/:id",addProductToWishlist);
router.patch("/remove/:id",removeProductFromWishlist);

export default router;