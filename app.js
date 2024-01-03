import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { initializePassport } from "./passport/config.js";

// Importing all Routes
import usersRouter from "./routes/Users.js";
import adminsRouter from "./routes/Admins.js";
import brandsRouter from "./routes/Brands.js";
import categoriesRouter from "./routes/Categories.js";

// Express app initilisation
export const app = express();

//Middlewares
app.use(express.json()); // for parsing json data from body
app.use(express.urlencoded({ extended: true })); // for parsing html form data
app.use(express.static(path.join(path.resolve(), "public")));
//environment variables
configDotenv({
  path: "./data/config.env",
});

// Session
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until session is initialized
  })
);
app.use(passport.initialize());
app.use(passport.session());

//CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URI,
      process.env.ADMIN_URI,
      "http://localhost:5000",
      "http://localhost:3000",
    ],
    method: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Initialzing passport Local Strategy
initializePassport(passport);

// Routes
app.use("/v1", usersRouter); // v1 designation for v1 api
app.use("/v1/admin", adminsRouter); // v1 designation for v1 api
app.use("/brands",brandsRouter);
app.use("/categories",categoriesRouter);

//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Normal 🟢" });
});
