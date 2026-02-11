console.log("Manager Controller Loaded");

const express = require("express");
const router = express.Router();

const managerController = require("../controllers/managerController");

router.get("/accounts", managerController.getAllAccounts);
router.get("/account/:accountNumber", managerController.getAccountDetails);
router.get("/requests", managerController.getDepositRequests);
router.post("/approve/:id", managerController.approveDeposit);
router.post("/decline/:id", managerController.declineDeposit);

module.exports = router;

console.log(module.exports);
