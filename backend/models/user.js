const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
    }


    password: {
      type: String,
      required: true,
    },

    accountNumber: {
      type: String,
      unique: true,
      required: true,
    },

    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
