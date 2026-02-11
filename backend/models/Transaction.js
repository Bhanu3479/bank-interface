const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    description: String,
    balanceAfter: Number,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
