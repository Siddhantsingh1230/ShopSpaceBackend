import express from "express";
import { getAllBrands,addBrand,deleteBrand } from "../controllers/Brands.js";

const router = express.Router();

router.get("/", getAllBrands);
router.post("/add", addBrand);
router.delete("/delete/:id", deleteBrand);

export default router;
