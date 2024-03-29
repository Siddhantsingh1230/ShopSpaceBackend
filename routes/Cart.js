import express from "express";
import { getAllCarts,deleteCart,updateCart,addCart,getTotalCartItems} from "../controllers/Cart.js";

const router = express.Router();
router.get("/totalCartItems",getTotalCartItems);
router.get("/:id",getAllCarts);
router.patch("/add",addCart);
router.patch("/update",updateCart);
router.delete("/delete/:id",deleteCart);

export default router;