const DepositRequest = require("../models/DepositRequest");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

// Get All Pending Requests
exports.getDepositRequests = async (req, res) => {
  const requests = await DepositRequest.find({ status: "pending" });
  res.json(requests);
};

// Approve Deposit
exports.approveDeposit = async (req, res) => {
  const { id } = req.params;

  const request = await DepositRequest.findById(id);
  if (!request) return res.status(404).json({ message: "Not found" });

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

  res.json({ message: "Deposit approved" });
};

// Decline Deposit
exports.declineDeposit = async (req, res) => {
  const { id } = req.params;

  const request = await DepositRequest.findById(id);
  if (!request) return res.status(404).json({ message: "Not found" });

  await Transaction.create({
    user: request.user,
    type: "dep_cancel",
    amount: 0,
  });

  request.status = "declined";
  await request.save();

  res.json({ message: "Deposit declined" });
};
