const mongoose = require("mongoose");

const depositRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountNumber: String,
    name: String,
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.DepositRequest ||
  mongoose.model("DepositRequest", depositRequestSchema);
