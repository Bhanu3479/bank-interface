const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getTransactions,
} = require("../controllers/transactionController");


// ================================
// TRANSACTION ROUTES (Mini Statement)
// ================================

// Get transaction history
router.get("/", protect, getTransactions);

module.exports = router;
