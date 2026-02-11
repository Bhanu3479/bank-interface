const DepositRequest = require("../models/DepositRequest");
const Transaction = require("../models/Transaction");
const User = require("../models/user");


// GET REQUESTS
exports.getDepositRequests = async (req, res) => {
  try {
    const requests = await DepositRequest.find({ status: "pending" });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// APPROVE
exports.approveDeposit = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await DepositRequest.findById(id);
    if (!request || request.status !== "pending")
      return res.status(400).json({ message: "Invalid request" });

    const user = await User.findById(request.user);

    user.balance += request.amount;
    await user.save();

    await Transaction.create({
      user: user._id,
      type: "deposit",
      amount: request.amount,
      balanceAfter: user.balance,
    });

    request.status = "approved";
    await request.save();

    res.json({ message: "Approved" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// DECLINE
exports.declineDeposit = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await DepositRequest.findById(id);
    if (!request || request.status !== "pending")
      return res.status(400).json({ message: "Invalid request" });

    const user = await User.findById(request.user);

    await Transaction.create({
      user: request.user,
      type: "dep_cancel",
      amount: 0,
      balanceAfter: user.balance,
    });

    request.status = "declined";
    await request.save();

    res.json({ message: "Declined" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
