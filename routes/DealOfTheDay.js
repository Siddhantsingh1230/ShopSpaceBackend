import express from "express";

const router = express.Router();

import {
  getAllDeals,
  getCurrentDeal,
  addNewDeal,
  deleteDeal,
  updateDeal,
} from "../controllers/DealOfTheDay.js";
import { isAdmin } from "../middlewares/auth.js";

router.get("/alldeals", getAllDeals);
router.get("/getcurrentdeal", getCurrentDeal);
router.post("/addnewdeal", isAdmin, addNewDeal);
router.delete("/deletedeal/:id", isAdmin, deleteDeal);
router.patch("/updatedeal/:id", isAdmin, updateDeal);

export default router;
