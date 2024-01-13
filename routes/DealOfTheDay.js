import express from "express";

const router = express.Router();

import {
  getAllDeals,
  getCurrentDeal,
  addNewDeal,
  deleteDeal,
  updateDeal,
} from "../controllers/DealOfTheDay.js";

router.get("/alldeals", getAllDeals);
router.get("/getcurrentdeal", getCurrentDeal);
router.post("/addnewdeal", isAdmin, addNewDeal);
router.delete("/deletedeal/:id", isAdmin, deleteDeal);
router.patch("/updatedeal/:id", updateDeal);

export default router;
