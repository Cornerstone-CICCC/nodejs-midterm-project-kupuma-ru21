import express, { Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

// Create server
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:4321", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// TODO

// 404 Fallback
app.use((_, res: Response) => {
  res.status(404).send("Invalid route");
});

// Start server
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/...");
});
