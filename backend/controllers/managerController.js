const DepositRequest = require("../models/DepositRequest");
const Transaction = require("../models/Transaction");
const User = require("../models/user"); // <-- Ensure correct casing


// ==========================================
// GET ALL PENDING REQUESTS
// ==========================================
exports.getDepositRequests = async (req, res) => {
  try {
    const requests = await DepositRequest.find({ status: "pending" });
    res.json(requests);
  } catch (error) {
    console.error("GET REQUESTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ==========================================
// APPROVE DEPOSIT
// ==========================================
exports.approveDeposit = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await DepositRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    const user = await User.findById(request.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add balance
    user.balance += request.amount;
    await user.save();

    // Create transaction
    await Transaction.create({
      user: user._id,
      type: "deposit",
      amount: request.amount,
      balanceAfter: user.balance,
    });

    request.status = "approved";
    await request.save();

    res.json({ message: "Deposit approved successfully" });

  } catch (error) {
    console.error("APPROVE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ==========================================
// DECLINE DEPOSIT
// ==========================================
exports.declineDeposit = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await DepositRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    const user = await User.findById(request.user);

    // Create cancel transaction
    await Transaction.create({
      user: request.user,
      type: "dep_cancel",
      amount: 0,
      balanceAfter: user ? user.balance : 0,
    });

    request.status = "declined";
    await request.save();

    res.json({ message: "Deposit declined successfully" });

  } catch (error) {
    console.error("DECLINE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
