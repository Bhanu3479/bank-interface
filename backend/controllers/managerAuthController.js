const Manager = require("../models/Manager");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER MANAGER
exports.registerManager = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Manager.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Manager already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const manager = await Manager.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Manager created successfully",
      managerId: manager._id,
    });

  } catch (error) {
    console.error("MANAGER REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// LOGIN MANAGER
exports.loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: manager._id, role: "manager" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      name: manager.name,
      email: manager.email,
    });

  } catch (error) {
    console.error("MANAGER LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
