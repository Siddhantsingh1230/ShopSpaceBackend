import express from "express";
import {getAllProducts,addProduct,deleteProduct,filterProduct} from "../controllers/Products.js";
import {isAdmin} from "../middlewares/auth.js";

const router = express.Router();

router.get("/",getAllProducts);
router.get("/filter",filterProduct);
router.post("/add",isAdmin,addProduct);
router.delete("/delete/:id",isAdmin,deleteProduct);


export default router;