"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({ origin: "http://localhost:5173/", credentials: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// NOTE: https://expressjs.com/en/starter/static-files.html
app.use(express_1.default.static("public"));
// Routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use("/api/users", user_routes_1.default);
const restaurant_routes_1 = __importDefault(require("./routes/restaurant.routes"));
app.use("/api/restaurants", restaurant_routes_1.default);
// 404 Fallback
app.use((_, res) => {
    res.status(404).send("Invalid route");
});
// Start server
app.listen(1000, () => {
    console.log("Server is running on http://localhost:1000/...");
});
