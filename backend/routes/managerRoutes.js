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

module.exports = router;
