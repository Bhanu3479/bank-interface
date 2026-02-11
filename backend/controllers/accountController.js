const User = require("../models/user");
const Transaction = require("../models/Transaction");
const DepositRequest = require("../models/DepositRequest");


// GET BALANCE
exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      accountNumber: user.accountNumber,
      name: user.name,
      balance: user.balance,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// DEPOSIT (REQUEST)
exports.deposit = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const user = await User.findById(req.user);

    await DepositRequest.create({
      user: user._id,
      accountNumber: user.accountNumber,
      name: user.name,
      amount: Number(amount),
      status: "pending",
    });

    res.json({
      message: "Deposit request sent. Wait for manager approval.",
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// WITHDRAW
exports.withdraw = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const user = await User.findById(req.user);

    if (user.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    user.balance -= Number(amount);
    await user.save();

    await Transaction.create({
      user: user._id,
      type: "withdraw",
      amount: Number(amount),
      balanceAfter: user.balance,
    });

    res.json({
      message: "Withdraw successful",
      balance: user.balance,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// TRANSFER
exports.transfer = async (req, res) => {
  try {
    const { receiverAccountNumber, amount } = req.body;

    if (!receiverAccountNumber || !amount || amount <= 0)
      return res.status(400).json({ message: "Invalid transfer details" });

    const sender = await User.findById(req.user);
    const receiver = await User.findOne({
      accountNumber: receiverAccountNumber,
    });

    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    if (sender.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    sender.balance -= Number(amount);
    receiver.balance += Number(amount);

    await sender.save();
    await receiver.save();

    await Transaction.create({
      user: sender._id,
      type: "transfer",
      amount: Number(amount),
      receiver: receiver._id,
      description: "to",
      balanceAfter: sender.balance,
    });

    await Transaction.create({
      user: receiver._id,
      type: "transfer",
      amount: Number(amount),
      receiver: sender._id,
      description: "from",
      balanceAfter: receiver.balance,
    });

    res.json({
      message: "Transfer successful",
      balance: sender.balance,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
