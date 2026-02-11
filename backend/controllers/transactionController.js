const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user })
      .populate("receiver", "accountNumber")
      .sort({ createdAt: -1 });

    const formatted = transactions.map((txn) => {
      let account = "SELF";
      let type = txn.type.toUpperCase();
      let crdr = "CR";

      if (txn.type === "withdraw") {
        crdr = "DR";
      }

      if (txn.type === "transfer") {
        account = txn.receiver?.accountNumber || "SELF";

        if (txn.description === "to") {
          crdr = "DR";
        } else if (txn.description === "from") {
          crdr = "CR";
        }
      }

      return {
        account,
        type,
        crdr,
        amount: txn.amount,
        datetime: txn.createdAt,
      };
    });

    res.json(formatted);

  } catch (error) {
    console.error("TRANSACTION ERROR:", error);
    res.status(500).json({ message: "Server error while fetching transactions" });
  }
};
