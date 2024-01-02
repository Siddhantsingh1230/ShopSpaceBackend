import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import cors from "cors";

// Express app initilisation
export const app = express();

//Middlewares
app.use(express.json());
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
      process.env.ADMIN_FRONTEND_URI,
      "http://localhost:5000",
      "http://localhost:3000",
    ],
    method: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

//Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All Systems Normal 🟢" });
});
