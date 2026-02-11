const express = require("express");
const router = express.Router();
const {
  getAllAccounts,
  getAccountDetails,
} = require("../controllers/managerController");

// GET all accounts
router.get("/accounts", getAllAccounts);

// GET specific account details
router.get("/account/:accountNumber", getAccountDetails);
router.get("/requests", getDepositRequests);
router.post("/approve/:id", approveDeposit);
router.post("/decline/:id", declineDeposit);

module.exports = router;
