import express from "express";

const router = express.Router();

import {
  getPosters,
  addNewPoster,
  deletePoster,
  updatePoster,
} from "../controllers/OfferPosters.js";
import { isAdmin } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

router.get("/getposters", getPosters);
router.post("/addnewposter", isAdmin,upload.single('file'), addNewPoster);
router.delete("/deleteposter/:id", isAdmin, deletePoster);
router.patch("/updateposter/:id", isAdmin, updatePoster);

export default router;
