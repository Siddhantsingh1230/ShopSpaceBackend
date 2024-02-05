import express from "express";
import { isAdmin } from "../middlewares/auth.js";
const router = express.Router();
import { getAllNotes, deleteNote, addNote ,updateNote } from "../controllers/Notes.js";

router.get("/getAllNotes/:userId", isAdmin, getAllNotes);
router.post("/addNote", isAdmin, addNote);
router.post("/updateNote/:id", isAdmin, updateNote);
router.delete("/deleteNote/:id", isAdmin, deleteNote);

export default router;  
