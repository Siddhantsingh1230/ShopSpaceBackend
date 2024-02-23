import express from "express";
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  mostOrdered,
  mostCommonLocation,
  mostUsedPaymentMethod,
  commonCategory,
  bonusMonth,
  cancelledProducts,
  deliveryCount,
  getAllOrders,
  updateOrderByAdmin,
  getTotalOrders,
  getTotalEarnings,
  bestSeller
} from "../controllers/Orders.js";

import { isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/mostcommonlocation", isAdmin, mostCommonLocation);
router.get("/mostordered", isAdmin, mostOrdered);
router.get("/mostusedpaymentmode", isAdmin, mostUsedPaymentMethod);
router.get("/commoncategory", isAdmin, commonCategory);
router.get("/cancelledProducts", isAdmin, cancelledProducts);
router.get("/deliverycounts", isAdmin, deliveryCount);
router.get("/bonusmonth", isAdmin, bonusMonth);
router.get("/getTotalOrders", isAdmin, getTotalOrders);
router.get("/getTotalEarnings", isAdmin, getTotalEarnings);
router.get("/getBestSeller",isAdmin,  bestSeller);
router.get("/:id", getOrders);
router.get("/", isAdmin, getAllOrders);
router.post("/add", addOrder);
router.patch("/updateByAdmin/:id", isAdmin, updateOrderByAdmin);
router.patch("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);

export default router;
