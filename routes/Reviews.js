import express from "express";
import {getReviewsByProductId,addReview,deleteReview} from "../controllers/Reviews.js"
import {isAdmin} from "../middlewares/auth.js";

const router = express.Router();

router.get("/:id",getReviewsByProductId);
router.delete("/delete/:id",isAdmin,deleteReview);
router.post("/add",addReview);

export default router;