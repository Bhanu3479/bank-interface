const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const accountController = require("../controllers/accountController");

router.get("/balance", authMiddleware, accountController.getBalance);
router.post("/deposit", authMiddleware, accountController.deposit);
router.post("/withdraw", authMiddleware, accountController.withdraw);
router.post("/transfer", authMiddleware, accountController.transfer);

module.exports = router;
