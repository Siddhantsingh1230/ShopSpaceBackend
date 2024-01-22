import express from "express";
import {getOrders,addOrder,updateOrder,deleteOrder,mostOrdered} from "../controllers/Orders.js";

const router = express.Router();

router.get("/mostordered",mostOrdered);
router.get("/:id",getOrders);
router.post("/add",addOrder);
router.patch("/update/:id",updateOrder);
router.delete("/delete/:id",deleteOrder);

export default router;