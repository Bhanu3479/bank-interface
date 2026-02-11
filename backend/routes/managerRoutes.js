const express = require("express");
const router = express.Router();

const {
  getAllAccounts,
  getAccountDetails,
  getDepositRequests,
  approveDeposit,
  declineDeposit,
} = require("../controllers/managerController");


// ==========================================
// GET ALL ACCOUNTS
// ==========================================
router.get("/accounts", getAllAccounts);


// ==========================================
// GET SPECIFIC ACCOUNT DETAILS
// ==========================================
router.get("/account/:accountNumber", getAccountDetails);


// ==========================================
// GET ALL DEPOSIT REQUESTS
// ==========================================
router.get("/requests", getDepositRequests);


// ==========================================
// APPROVE DEPOSIT REQUEST
// ==========================================
router.post("/approve/:id", approveDeposit);


// ==========================================
// DECLINE DEPOSIT REQUEST
// ==========================================
router.post("/decline/:id", declineDeposit);


module.exports = router;
