import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { initializePassport } from "./passport/config.js";

// Importing all Routes
import usersRouter from "./routes/Users.js";

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

//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Normal 🟢" });
});


// Custom error handling middleware for failed authentication
app.use((err, req, res, next) => {
  if (err) {
    const errorMessage = err.message || "Authentication failed";
    return res.status(401).json({ success: false, message: errorMessage });
  }
  next();
});