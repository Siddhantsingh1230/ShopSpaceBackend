import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import cors from "cors";

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

// Routes
app.use("/v1", usersRouter); // v1 designation for v1 api

//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Normal 🟢" });
});
