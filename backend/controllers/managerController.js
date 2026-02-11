const User = require("../models/User");
const Transaction = require("../models/Transaction");

// 1️⃣ Get All Accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const users = await User.find().select(
      "accountNumber name email mobile"
    );

    res.json(users);
  } catch (error) {
    console.error("MANAGER GET ACCOUNTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️⃣ Get Account Details + Transactions
exports.getAccountDetails = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    const transactions = await Transaction.find({ user: user._id })
      .populate("receiver", "accountNumber")
      .sort({ createdAt: -1 });

    res.json({
      user,
      transactions,
    });

  } catch (error) {
    console.error("MANAGER ACCOUNT DETAILS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
