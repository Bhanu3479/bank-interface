const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ==========================================
// GENERATE UNIQUE ACCOUNT NUMBER
// ==========================================
const generateAccountNumber = async () => {
  const lastUser = await User.findOne().sort({ createdAt: -1 });

  let newNumber = 1;

  if (lastUser && lastUser.accountNumber) {
    const lastNumber = parseInt(
      lastUser.accountNumber.replace("ACC", "")
    );
    newNumber = lastNumber + 1;
  }

  return "ACC" + String(newNumber).padStart(5, "0");
};


// ==========================================
// REGISTER
// ==========================================
exports.register = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Validation
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All fields including mobile are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate account number
    const accountNumber = await generateAccountNumber();

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile: Number(mobile),
      accountNumber,
      balance: 0,
    });

    res.status(201).json({
      message: "Account created successfully",
      accountNumber: newUser.accountNumber,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Server error during registration",
    });
  }
};


// ==========================================
// LOGIN
// ==========================================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        accountNumber: user.accountNumber,
        balance: user.balance,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
};
