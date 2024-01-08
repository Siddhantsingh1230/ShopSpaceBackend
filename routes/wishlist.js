import express from "express";
import { getWishlist } from "../controllers/Wishlist.js";

const router = express.Router();
router.get("/:id",getWishlist);

export default router;