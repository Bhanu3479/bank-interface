const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const managerRoutes = require("./routes/managerRoutes");
const managerAuthRoutes = require("./routes/managerAuthRoutes");


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// ================================
// Middleware
// ================================

// Enable CORS
app.use(cors());


app.use("/api/manager", managerRoutes);

// Parse JSON bodies
app.use(express.json());

// ================================
// Routes
// ================================

app.use("/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/manager-auth", managerAuthRoutes);
// Root route
app.get("/", (req, res) => {
  res.send("🏦 MERN Banking API is running...");
});

// ================================
// 404 Handler
// ================================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ================================
// Global Error Handler
// ================================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ================================
// Start Server
// ================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
