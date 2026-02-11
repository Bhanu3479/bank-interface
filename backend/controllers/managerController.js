const DepositRequest = require("../models/DepositRequest");
const Transaction = require("../models/Transaction");
const User = require("../models/user");


// GET ALL ACCOUNTS
exports.getAllAccounts = async (req, res) => {
  try {
    const users = await User.find().select(
      "accountNumber name email mobile balance"
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET ACCOUNT DETAILS
exports.getAccountDetails = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    const transactions = await Transaction.find({ user: user._id })
      .sort({ createdAt: -1 });

    res.json({ user, transactions });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET DEPOSIT REQUESTS
exports.getDepositRequests = async (req, res) => {
  try {
    const requests = await DepositRequest.find({ status: "pending" });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// APPROVE DEPOSIT
exports.approveDeposit = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await DepositRequest.findById(id);
    if (!request || request.status !== "pending") {
      return res.status(400).json({ message: "Invalid request" });
    }

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

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// DECLINE DEPOSIT
exports.declineDeposit = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await DepositRequest.findById(id);
    if (!request || request.status !== "pending") {
      return res.status(400).json({ message: "Invalid request" });
    }

    const user = await User.findById(request.user);

    await Transaction.create({
      user: request.user,
      type: "dep_cancel",
      amount: 0,
      balanceAfter: user.balance,
    });

    request.status = "declined";
    await request.save();

    res.json({ message: "Deposit declined" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
