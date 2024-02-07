import { notesModel } from "../models/Notes.js";

export const getAllNotes = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId)
    const notes = await notesModel.find({ userId });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await notesModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Note Deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error, message: "Failed to delete" });
  }
};
export const addNote = async (req, res) => {
  try {
    const { title, userId, category, createdAt } = req.body;
    const note = await notesModel.create({
      title,
      userId,
      category,
      createdAt,
    });

    res.status(201).json({ success: true, message: "Note created ", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    let note = await notesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({ success: true, message: "Note updated ", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
