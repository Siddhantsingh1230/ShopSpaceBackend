import express from "express";

const router = express.Router();

import {
  getPosters,
  addNewPoster,
  deletePoster,
  updatePoster,
} from "../controllers/.js";
import { isAdmin } from "../middlewares/auth.js";

router.get("/getposters", getPosters);
router.post("/addnewposter", isAdmin, addNewPoster);
router.delete("/deleteposter/:id", isAdmin, deletePoster);
router.patch("/updateposter/:id", isAdmin, updatePoster);

export default router;
