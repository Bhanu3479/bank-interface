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
router.post("/deposit", authMiddleware, accountController.deposit);
router.post("/withdraw", authMiddleware, accountController.withdraw);
router.post("/transfer", authMiddleware, accountController.transfer);
router.get("/balance", authMiddleware, accountController.getBalance);
