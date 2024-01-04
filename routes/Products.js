import express from "express";
import {getAllProducts,addProduct,deleteProduct,filterProduct} from "../controllers/Products.js";

const router = express.Router();

router.get("/",getAllProducts);
router.get("/filter",filterProduct);
router.post("/add",addProduct);
router.delete("/delete/:id",deleteProduct);


export default router;