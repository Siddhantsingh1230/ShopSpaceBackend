import express from "express";
import {getOrderLocations,addOrderLocation,updateOrderLocation, deleteOrderLocation} from "../controllers/orderLocation.js";
import {isAdmin} from "../middlewares/auth.js";

const router = express.Router();

router.get("/",getOrderLocations);
router.post("/add",isAdmin,addOrderLocation);
router.patch("/update/:id",isAdmin,updateOrderLocation);
router.delete("/delete/:id",isAdmin,deleteOrderLocation);

export default router;