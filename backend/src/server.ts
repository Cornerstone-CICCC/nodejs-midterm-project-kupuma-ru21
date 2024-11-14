import express, { Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Create server
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173/", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// NOTE: https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Routes
import userRouter from "./routes/user.routes";
app.use("/api/users", userRouter);

import restaurantRouter from "./routes/restaurant.routes";
app.use("/api/restaurants", restaurantRouter);

// 404 Fallback
app.use((_, res: Response) => {
  res.status(404).send("Invalid route");
});

// Start server
app.listen(1000, () => {
  console.log("Server is running on http://localhost:1000/...");
});
