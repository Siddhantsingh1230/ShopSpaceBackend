import { calenderModel } from "../models/Calender.js";

export const getCalender = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId)
    const calender = await calenderModel.find({ userId });
    res.status(200).json({ success: true, calender });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
export const addEvent = async (req, res) => {
  try {
    const event = await calenderModel.create({
      ...req.body,
    });

    res.status(201).json({ success: true, message: "Event created", event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let event = await calenderModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({ success: true, message: "Event updated ", event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await calenderModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error, message: "Failed to delete" });
  }
};
