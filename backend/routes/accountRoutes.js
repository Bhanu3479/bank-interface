const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getBalance,
  deposit,
  withdraw,
  transfer,
} = require("../controllers/accountController");


// ================================
// ACCOUNT ROUTES (Protected)
// ================================

// Get balance
router.get("/balance", protect, getBalance);

// Deposit money
router.post("/deposit", protect, deposit);

// Withdraw money
router.post("/withdraw", protect, withdraw);

// Transfer money
router.post("/transfer", protect, transfer);

module.exports = router;
