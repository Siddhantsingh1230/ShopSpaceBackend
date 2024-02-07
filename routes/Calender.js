import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { getCalender, addEvent, updateEvent ,deleteEvent } from "../controllers/Calender.js";

const router = express.Router();

router.get("/getCalender/:userId", isAdmin, getCalender);
router.post("/addEvent", isAdmin, addEvent);
router.post("/updateEvent/:id", isAdmin, updateEvent);
router.delete("/deleteEvent/:id", isAdmin, deleteEvent);


export default router;
