import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

// Importing all Routes
import usersRouter from "./routes/Users.js";
import adminsRouter from "./routes/Admins.js";
import categoriesRouter from "./routes/Categories.js";
import productsRouter from "./routes/Products.js";
import reviewsRouter from "./routes/Reviews.js";
import orderLocationRouter from "./routes/OrderLocation.js";
import orderRouter from "./routes/Orders.js";
import wishlistRouter from "./routes/wishlist.js";
import cartRouter from "./routes/Cart.js";
import dodRouter from "./routes/DealOfTheDay.js";
import offerPostersRouter from "./routes/OfferPosters.js";
import notesRouter from "./routes/Notes.js";
import calenderRouter from "./routes/Calender.js";

// Express app initilisation
export const app = express();

//Middlewares
app.use(express.json()); // for parsing json data from body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing html form data
app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");
//environment variables
configDotenv({
  path: "./data/config.env",
});


//CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URI,
      process.env.ADMIN_URI,
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    method: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,  
  })
);


// Routes // v1 designation for v1 api
app.use("/v1", usersRouter);
app.use("/v1/admin", adminsRouter);
app.use("/v1/categories", categoriesRouter);
app.use("/v1/products", productsRouter);
app.use("/v1/reviews", reviewsRouter);
app.use("/v1/orderLocations", orderLocationRouter);
app.use("/v1/orders", orderRouter);
app.use("/v1/wishlist", wishlistRouter);
app.use("/v1/cart", cartRouter);
app.use("/v1/dod", dodRouter);
app.use("/v1/offer", offerPostersRouter);
app.use("/v1/notes", notesRouter);
app.use("/v1/calender", calenderRouter);

//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Normal 🟢" });
});
